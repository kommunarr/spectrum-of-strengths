import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const localeFiles = {
  en: resolve('src/locales/en-ca/translation.json'),
  fr: resolve('src/locales/fr-ca/translation.json'),
};

export const nonContentNamespaces = new Set(['otherLanguage']);

export function flattenKeys(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const childPrefix = prefix ? `${prefix}.${key}` : key;
    return flattenKeys(child, childPrefix);
  });
}

export async function loadLocale(path) {
    return JSON.parse(await readFile(path, 'utf8'));
}

export function difference(left, right) {
  const rightSet = new Set(right);
  return left.filter((key) => !rightSet.has(key));
}

export function getContentNamespaces(locales) {
  return [...new Set([
    ...Object.keys(locales.en),
    ...Object.keys(locales.fr),
  ])]
    .filter((namespace) => !nonContentNamespaces.has(namespace))
    .sort();
}

export function validateTranslations(locales, namespaces = getContentNamespaces(locales)) {
  const errors = [];
  for (const namespace of namespaces) {
    const englishKeys = flattenKeys(locales.en[namespace] ?? {}, namespace).sort();
    const frenchKeys = flattenKeys(locales.fr[namespace] ?? {}, namespace).sort();
    const missingInFrench = difference(englishKeys, frenchKeys);
    const missingInEnglish = difference(frenchKeys, englishKeys);

    if (missingInFrench.length > 0) {
      errors.push(`${namespace}: missing in French: ${missingInFrench.join(', ')}`);
    }
    if (missingInEnglish.length > 0) {
      errors.push(`${namespace}: missing in English: ${missingInEnglish.join(', ')}`);
    }
  }

  return errors;
}

const archiveCategories = new Set(['heritage', 'research', 'experience', 'gaps', 'progress']);
const archiveStatuses = new Set(['planned', 'inProgress', 'confirmed']);
const sharedArchiveFields = ['publicationDate', 'sourceDateTime', 'category', 'status', 'sourceUrl'];

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isIsoSourceDateTime(value) {
  if (isIsoDate(value)) return true;
  if (
    typeof value !== 'string' ||
    !/^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
  ) {
    return false;
  }

  const sourceDate = value.slice(0, 10);
  return isIsoDate(sourceDate) && !Number.isNaN(Date.parse(value));
}

function validateArchiveLocale(locale, language) {
  const errors = [];
  const entries = locale?.common?.archivePage?.entries;

  if (!Array.isArray(entries)) {
    return {
      entries: new Map(),
      errors: [`${language}.common.archivePage.entries must be an array.`],
    };
  }

  const entryMap = new Map();
  for (const [index, entry] of entries.entries()) {
    const label = `${language}.common.archivePage.entries[${index}]`;
    if (!isRecord(entry)) {
      errors.push(`${label} must be an object.`);
      continue;
    }

    if (typeof entry.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) {
      errors.push(`${label}.id must be a lowercase hyphenated identifier.`);
    } else if (entryMap.has(entry.id)) {
      errors.push(`${label}.id duplicates ${entry.id}.`);
    } else {
      entryMap.set(entry.id, entry);
    }

    for (const field of ['title', 'summary']) {
      if (typeof entry[field] !== 'string' || entry[field].trim().length === 0) {
        errors.push(`${label}.${field} must be a non-empty string.`);
      }
    }

    if (!isIsoDate(entry.publicationDate)) {
      errors.push(`${label}.publicationDate must be a valid YYYY-MM-DD date.`);
    }
    if (!archiveCategories.has(entry.category)) {
      errors.push(`${label}.category must be a supported archive category.`);
    }
    if (!archiveStatuses.has(entry.status)) {
      errors.push(`${label}.status must be a supported publication status.`);
    }
    if (entry.sourceDateTime !== undefined && !isIsoSourceDateTime(entry.sourceDateTime)) {
      errors.push(`${label}.sourceDateTime must be a date or ISO 8601 timestamp with a time-zone offset.`);
    }
    if (
      entry.sourceContext !== undefined &&
      (typeof entry.sourceContext !== 'string' || entry.sourceContext.trim().length === 0)
    ) {
      errors.push(`${label}.sourceContext must be a non-empty string when provided.`);
    }
    if (entry.sourceUrl !== undefined) {
      try {
        const sourceUrl = new URL(entry.sourceUrl);
        if (sourceUrl.protocol !== 'https:' || sourceUrl.username || sourceUrl.password) {
          errors.push(`${label}.sourceUrl must be a public HTTPS URL without embedded credentials.`);
        }
      } catch {
        errors.push(`${label}.sourceUrl must be a valid public HTTPS URL.`);
      }
    }
  }

  return { entries: entryMap, errors };
}

export function validateArchiveEntries(locales) {
  const english = validateArchiveLocale(locales.en, 'en');
  const french = validateArchiveLocale(locales.fr, 'fr');
  const errors = [...english.errors, ...french.errors];

  for (const id of english.entries.keys()) {
    if (!french.entries.has(id)) {
      errors.push(`Archive entry ${id} is missing from the French locale.`);
    }
  }
  for (const id of french.entries.keys()) {
    if (!english.entries.has(id)) {
      errors.push(`Archive entry ${id} is missing from the English locale.`);
    }
  }

  for (const [id, englishEntry] of english.entries) {
    const frenchEntry = french.entries.get(id);
    if (!frenchEntry) continue;

    for (const field of sharedArchiveFields) {
      if (englishEntry[field] !== frenchEntry[field]) {
        errors.push(`Archive entry ${id} must use the same ${field} in both locales.`);
      }
    }
  }

  return errors;
}

export async function loadLocales() {
  return {
    en: await loadLocale(localeFiles.en),
    fr: await loadLocale(localeFiles.fr),
  };
}

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isMainModule) {
  const locales = await loadLocales();
  const namespaces = getContentNamespaces(locales);
  const errors = [
    ...validateTranslations(locales, namespaces),
    ...validateArchiveEntries(locales),
  ];
  if (errors.length > 0) {
    console.error('Translation/content check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Translation/content check passed for ${namespaces.join(', ')}.`);
}
