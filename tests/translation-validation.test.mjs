import assert from 'node:assert/strict';
import test from 'node:test';
import { flattenKeys, validateTranslations } from '../scripts/check-translations.mjs';

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
