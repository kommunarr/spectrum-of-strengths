import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createRouteRenderer } from './render-route-content.mjs';

const outputDirectory = 'dist';
const siteRoot = 'https://kommunarr.github.io/spectrum-of-strengths/';
const routeDefinitions = [
  ['homePath', 'homePage.title', 'homePage.metaDescription', 'Home'],
  ['aboutPath', 'about', 'foundationsPage.metaDescription', 'About'],
  ['archivePath', 'archive', 'archivePage.metaDescription', 'Archive'],
  ['glossaryPath', 'glossary', 'glossaryPage.metaDescription', 'Glossary'],
  ['eventsPath', 'events', 'developmentsPage.eventsMetaDescription', 'Events'],
  ['contactPath', 'contact', 'developmentsPage.contactMetaDescription', 'Contact'],
  ['termsOfUseAndPrivacyPath', 'termsOfUseAndPrivacy', 'privacyPage.metaDescription', 'TermsOfUseAndPrivacy'],
  ['accessibilityStandardsPath', 'accessibilityStandards', 'accessibilityPage.metaDescription', 'AccessibilityStandards'],
];

const [english, french, template] = await Promise.all([
  readFile(new URL('../src/locales/en-ca/translation.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../src/locales/fr-ca/translation.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(join(outputDirectory, 'index.html'), 'utf8'),
]);

function valueAt(source, key) {
  const value = key.split('.').reduce((current, part) => current?.[part], source);
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing published route value: ${key}`);
  }
  return value;
}

function pathFor(locale, pathKey) {
  const value = locale.common[pathKey];
  if (typeof value !== 'string') throw new Error(`Missing published route path: ${pathKey}`);
  return value.replace(/^\/+|\/+$/g, '');
}

function publicUrl(path) {
  return new URL(path ? `${path}/` : '', siteRoot).href;
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function replaceRequired(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Missing metadata pattern: ${pattern}`);
  return html.replace(pattern, replacement);
}

function pageHtml(locale, language, path, otherPath, titleKey, descriptionKey, content, objectType = 'website') {
  const common = locale.common;
  const title = `${valueAt(common, titleKey)} | ${common.organizationName}`;
  const description = valueAt(common, descriptionKey);
  const canonical = publicUrl(path);
  const socialImage = new URL(`social-preview-${language}.png`, siteRoot).href;
  const socialImageAlt = valueAt(common, 'socialImageAlt');
  const englishUrl = language === 'en' ? canonical : publicUrl(otherPath);
  const frenchUrl = language === 'fr' ? canonical : publicUrl(otherPath);
  const alternateLinks = `\n    <link rel="alternate" hreflang="en-CA" href="${escapeHtml(englishUrl)}" />` +
    `\n    <link rel="alternate" hreflang="fr-CA" href="${escapeHtml(frenchUrl)}" />`;

  let html = replaceRequired(template, /<html lang="[^"]*">/, `<html lang="${language}">`);
  html = replaceRequired(html, /<\/head>/,
    `  <noscript><link rel="stylesheet" href="/spectrum-of-strengths/no-script.css" /></noscript>\n  </head>`);
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceRequired(html, /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />${alternateLinks}`);
  html = replaceRequired(html, /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${objectType}" />`);
  html = replaceRequired(html, /<meta property="og:locale" content="[^"]*" \/>/,
    `<meta property="og:locale" content="${language === 'fr' ? 'fr_CA' : 'en_CA'}" />`);
  html = replaceRequired(html, /<meta property="og:locale:alternate" content="[^"]*" \/>/,
    `<meta property="og:locale:alternate" content="${language === 'fr' ? 'en_CA' : 'fr_CA'}" />`);
  for (const [property, content] of [
    ['og:title', title], ['og:description', description], ['og:url', canonical],
    ['og:image', socialImage], ['og:image:alt', socialImageAlt],
  ]) {
    html = replaceRequired(html, new RegExp(`<meta property="${property}" content="[^"]*" \\/>`),
      `<meta property="${property}" content="${escapeHtml(content)}" />`);
  }
  for (const [name, content] of [
    ['twitter:title', title], ['twitter:description', description],
    ['twitter:image', socialImage], ['twitter:image:alt', socialImageAlt],
  ]) {
    html = replaceRequired(html, new RegExp(`<meta name="${name}" content="[^"]*" \\/>`),
      `<meta name="${name}" content="${escapeHtml(content)}" />`);
  }
  html = replaceRequired(html, /<div id="root"><\/div>/,
    `<div id="root" data-route-path="${escapeHtml(new URL(canonical).pathname)}">${content}</div>`);
  return html;
}

const renderRoute = await createRouteRenderer(outputDirectory);
const sitemapEntries = [];
for (const [pathKey, titleKey, descriptionKey, componentName] of routeDefinitions) {
  const englishPath = pathFor(english, pathKey);
  const frenchPath = pathFor(french, pathKey);
  const englishRoute = englishPath ? `/${englishPath}` : '/';
  const frenchRoute = `/${frenchPath}`;
  if (english.otherLanguage[englishRoute] !== frenchRoute ||
    french.otherLanguage[frenchRoute] !== englishRoute) {
    throw new Error(`English/French route mismatch for ${pathKey}`);
  }
  const alternates = [
    ['en-CA', publicUrl(englishPath)],
    ['fr-CA', publicUrl(frenchPath)],
  ].map(([language, url]) =>
    `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeHtml(url)}" />`).join('\n');

  for (const [locale, language, path, otherPath] of [
    [english, 'en', englishPath, frenchPath],
    [french, 'fr', frenchPath, englishPath],
  ]) {
    const directory = join(outputDirectory, path);
    await mkdir(directory, { recursive: true });
    const content = await renderRoute({
      componentName, locale, language, url: publicUrl(path),
    });
    await writeFile(join(directory, 'index.html'),
      pageHtml(locale, language, path, otherPath, titleKey, descriptionKey, content));
    sitemapEntries.push(`  <url>\n    <loc>${escapeHtml(publicUrl(path))}</loc>\n${alternates}\n  </url>`);
  }
}

for (const [englishIndex, entry] of english.common.archivePage.entries.entries()) {
  const frenchIndex = french.common.archivePage.entries.findIndex((other) => other.id === entry.id);
  if (frenchIndex < 0) throw new Error(`Missing French archive entry: ${entry.id}`);
  const englishPath = `${pathFor(english, 'archivePath')}/${entry.id}`;
  const frenchPath = `${pathFor(french, 'archivePath')}/${entry.id}`;
  const alternates = [
    ['en-CA', publicUrl(englishPath)],
    ['fr-CA', publicUrl(frenchPath)],
  ].map(([language, url]) =>
    `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeHtml(url)}" />`).join('\n');

  for (const [locale, language, path, otherPath, entryIndex] of [
    [english, 'en', englishPath, frenchPath, englishIndex],
    [french, 'fr', frenchPath, englishPath, frenchIndex],
  ]) {
    const directory = join(outputDirectory, path);
    await mkdir(directory, { recursive: true });
    const content = await renderRoute({
      componentName: 'ArchiveEntryPage', entryId: entry.id,
      locale, language, url: publicUrl(path),
    });
    await writeFile(join(directory, 'index.html'), pageHtml(
      locale, language, path, otherPath,
      `archivePage.entries.${entryIndex}.title`,
      `archivePage.entries.${entryIndex}.summary`, content, 'article',
    ));
    sitemapEntries.push(`  <url>\n    <loc>${escapeHtml(publicUrl(path))}</loc>\n${alternates}\n  </url>`);
  }
}

await writeFile(join(outputDirectory, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  sitemapEntries.join('\n') +
  `\n</urlset>\n`);

console.log(`Generated ${sitemapEntries.length} direct route pages and sitemap.xml.`);
