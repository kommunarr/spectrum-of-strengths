import assert from 'node:assert/strict';
import test from 'node:test';
import { getCorrespondingPageRouteInOtherLanguage } from '../src/utils/routeMapping.ts';

function createTranslations(routes) {
  const t = (key, options) => {
    if (options?.ns === 'otherLanguage') return routes[key] ?? key;
    return key === 'homePath' ? '' : key;
  };
  const i18n = {
    exists: (path) => Object.hasOwn(routes, path),
  };
  return { t, i18n };
}

test('maps a known English route to its French route', () => {
  const { t, i18n } = createTranslations({ '/contact-us': 'fr/contactez-nous' });

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/contact-us'),
    'fr/contactez-nous',
  );
});

test('falls back to the translated home route for an unknown path', () => {
  const { t, i18n } = createTranslations({ '/': 'fr' });

  assert.equal(
    getCorrespondingPageRouteInOtherLanguage(t, i18n, '/does-not-exist'),
    'fr',
  );
});
