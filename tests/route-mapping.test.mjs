import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  getCorrespondingPageRouteInOtherLanguage,
  getLanguageForPath,
} from '../src/utils/routeMapping.ts';

const englishLocale = JSON.parse(
  await readFile(new URL('../src/locales/en-ca/translation.json', import.meta.url), 'utf8'),
);
const frenchLocale = JSON.parse(
  await readFile(new URL('../src/locales/fr-ca/translation.json', import.meta.url), 'utf8'),
);

function createTranslations(routes, homePath = '') {
  const t = (key, options) => {
    if (options?.ns === 'otherLanguage') return routes[key] ?? key;
    return key === 'homePath' ? homePath : key;
  };
  const i18n = {
    exists: (path) => Object.hasOwn(routes, path),
  };
  return { t, i18n };
}

test('maps a known English route to its French route', () => {
  const { t, i18n } = createTranslations({ '/contact-us': '/fr/contactez-nous' });

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/contact-us'),
    '/fr/contactez-nous',
  );
});

test('falls back to the translated home route for an unknown path', () => {
  const { t, i18n } = createTranslations({ '/': '/fr' });

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/does-not-exist'),
    '/fr',
  );
});

test('maps a known French route to its English route', () => {
  const { t, i18n } = createTranslations({ '/fr/événements': '/events' }, 'fr');

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/fr/événements'),
    '/events',
  );
});

test('falls back to the English home route from a French path', () => {
  const { t, i18n } = createTranslations({ '/fr': '/' }, 'fr');

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/fr/unknown'),
    '/',
  );
});

test('maps every published route in both locale tables', () => {
  for (const locale of [englishLocale, frenchLocale]) {
    const { t, i18n } = createTranslations(
      locale.otherLanguage,
      locale.common.homePath,
    );

    for (const [path, target] of Object.entries(locale.otherLanguage)) {
      if (!path.startsWith('/')) continue;

      assert.equal(
        getCorrespondingPageRouteInOtherLanguage(t, i18n, path),
        target,
        `route mapping for ${path}`,
      );
    }
  }
});

test('keeps the published English and French route maps in sync', () => {
  const englishRoutes = Object.fromEntries(
    Object.entries(englishLocale.otherLanguage).filter(([path]) => path.startsWith('/')),
  );
  const frenchRoutes = Object.fromEntries(
    Object.entries(frenchLocale.otherLanguage).filter(([path]) => path.startsWith('/')),
  );

  assert.deepEqual(Object.keys(frenchRoutes).sort(), Object.values(englishRoutes).sort());
  for (const [englishPath, frenchPath] of Object.entries(englishRoutes)) {
    assert.equal(frenchRoutes[frenchPath], englishPath, `reverse route mapping for ${englishPath}`);
  }
});

test('detects the language for an unmatched route', () => {
  assert.equal(getLanguageForPath('/fr/not-found'), 'fr');
  assert.equal(getLanguageForPath('/not-found'), 'en');
  assert.equal(getLanguageForPath('/fragments'), 'en');
});
