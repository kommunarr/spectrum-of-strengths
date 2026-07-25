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
  const errors = validateTranslations(locales, namespaces);
  if (errors.length > 0) {
    console.error('Translation key check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Translation key check passed for ${namespaces.join(', ')}.`);
}
