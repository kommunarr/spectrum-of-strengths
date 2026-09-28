import { randomUUID } from 'node:crypto';
import { mkdir, readdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import i18next from 'i18next';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';

const componentNames = [
  'Home', 'About', 'Archive', 'Glossary', 'Events', 'Contact',
  'TermsOfUseAndPrivacy', 'AccessibilityStandards',
];

export async function createRouteRenderer(outputDirectory) {
  const assets = await readdir(resolve(outputDirectory, 'assets'));
  const logoAsset = assets.find((asset) => /^SpectrumOfStrengthsLogo-[^/]+\.svg$/.test(asset));
  if (!logoAsset) throw new Error('The built logo asset is missing.');
  const logoUrl = `/spectrum-of-strengths/assets/${logoAsset}`;
  const cacheDirectory = resolve('node_modules/.cache');
  const bundlePath = resolve(cacheDirectory, `spectrum-route-renderer-${randomUUID()}.mjs`);
  const componentExports = componentNames.map((name) =>
    `export { default as ${name} } from './src/views/${name}/${name}.tsx';`).join('\n');

  await mkdir(cacheDirectory, { recursive: true });
  let components;
  try {
    await build({
      stdin: {
        contents: `${componentExports}\nexport { default as Layout } from './src/components/Layout/Layout.component.tsx';`,
        resolveDir: process.cwd(),
        sourcefile: 'route-renderer.tsx',
        loader: 'tsx',
      },
      bundle: true,
      format: 'esm',
      platform: 'node',
      packages: 'external',
      loader: { '.css': 'empty' },
      outfile: bundlePath,
      plugins: [{
        name: 'published-logo',
        setup(builder) {
          builder.onResolve({ filter: /SpectrumOfStrengthsLogo\.svg$/ }, () => ({
            path: 'published-logo', namespace: 'published-logo',
          }));
          builder.onLoad({ filter: /.*/, namespace: 'published-logo' }, () => ({
            contents: `export default ${JSON.stringify(logoUrl)};`, loader: 'js',
          }));
        },
      }],
    });
    components = await import(pathToFileURL(bundlePath).href);
  } finally {
    await unlink(bundlePath).catch(() => {});
  }

  const translations = new Map();
  return async function renderRoute({ componentName, locale, language, url }) {
    if (!componentNames.includes(componentName)) {
      throw new Error(`Unknown page component: ${componentName}`);
    }
    if (!translations.has(language)) {
      const instance = i18next.createInstance();
      await instance.use(initReactI18next).init({
        lng: language,
        fallbackLng: false,
        resources: { [language]: {
          common: locale.common,
          otherLanguage: locale.otherLanguage,
        } },
      });
      translations.set(language, instance);
    }

    return renderToString(
      React.createElement(I18nextProvider, { i18n: translations.get(language) },
        React.createElement(StaticRouter, {
          location: new URL(url).pathname,
          basename: '/spectrum-of-strengths/',
        }, React.createElement(components.Layout, {
          outlet: React.createElement(components[componentName]),
        }))),
    );
  };
}
