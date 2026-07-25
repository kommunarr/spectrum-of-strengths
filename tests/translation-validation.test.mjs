import assert from 'node:assert/strict';
import test from 'node:test';
import {
  flattenKeys,
  getContentNamespaces,
  validateTranslations,
} from '../scripts/check-translations.mjs';

test('flattens nested translation objects into stable keys', () => {
  assert.deepEqual(
    flattenKeys({ common: { navigation: { menu: 'Menu' } } }),
    ['common.navigation.menu'],
  );
});

test('reports missing keys in either locale', () => {
  const locales = {
    en: { common: { home: 'Home', events: 'Events' } },
    fr: { common: { home: 'Accueil', contact: 'Contact' } },
  };

  assert.deepEqual(validateTranslations(locales, ['common']), [
    'common: missing in French: common.events',
    'common: missing in English: common.contact',
  ]);
});

test('discovers new content namespaces without a hard-coded allowlist', () => {
  const locales = {
    en: { common: { home: 'Home' }, events: { title: 'Events' }, otherLanguage: {} },
    fr: { common: { home: 'Accueil' }, events: {}, otherLanguage: {} },
  };

  assert.deepEqual(getContentNamespaces(locales), ['common', 'events']);
  assert.deepEqual(validateTranslations(locales), [
    'events: missing in French: events.title',
  ]);
});
