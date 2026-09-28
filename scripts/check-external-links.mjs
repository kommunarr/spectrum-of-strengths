import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from '@playwright/test';

const previewPort = process.env.EXTERNAL_LINK_PORT ?? '4176';
const configuredSiteUrl = process.env.SITE_URL?.trim();
const localSiteUrl = `http://127.0.0.1:${previewPort}/spectrum-of-strengths/`;
const requestTimeout = 15_000;

function getRoutePaths(english, french) {
  const pagePaths = Object.entries(english.otherLanguage)
    .filter(([path]) => path.startsWith('/'))
    .flatMap(([englishPath, frenchPath]) => [englishPath, frenchPath]);
  const entryPaths = english.common.archivePage.entries.flatMap((entry) => [
    `/${english.common.archivePath}/${entry.id}`,
    `/${french.common.archivePath}/${entry.id}`,
  ]);
  return [...pagePaths, ...entryPaths];
}

async function loadLocales() {
  return Promise.all(['en-ca', 'fr-ca'].map(async (language) => JSON.parse(await readFile(
    new URL(`../src/locales/${language}/translation.json`, import.meta.url), 'utf8',
  ))));
}

async function waitForPreview(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return;
    } catch {
      // The preview process may need a few seconds to start.
    }
    await delay(250);
  }

  throw new Error(`Preview server did not become available at ${url}.`);
}

async function startPreview() {
  const server = spawn(
    'npm',
    ['run', 'preview', '--', '--host', '127.0.0.1', '--port', previewPort],
    { stdio: 'inherit' },
  );
  try {
    await waitForPreview(localSiteUrl);
    return server;
  } catch (error) {
    server.kill('SIGTERM');
    throw error;
  }
}

async function findExternalLinks(siteUrl, routePaths) {
  const baseUrl = new URL(siteUrl);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const links = new Map();

  try {
    for (const path of routePaths) {
      const routeUrl = new URL(path === '/' ? '' : `${path.slice(1)}/`, baseUrl).toString();
      await page.goto(routeUrl, { waitUntil: 'networkidle' });
      await page.waitForFunction(
        (expectedLanguage) => document.documentElement.lang === expectedLanguage,
        path.startsWith('/fr') ? 'fr' : 'en',
      );

      const hrefs = await page.locator('a').evaluateAll((anchors) => (
        anchors
          .map((anchor) => anchor.getAttribute('href'))
          .filter((href) => href !== null)
      ));

      for (const rawHref of hrefs) {
        const href = new URL(rawHref, page.url());
        if (href.protocol === 'https:' && href.origin !== baseUrl.origin) {
          links.set(href.toString(), routeUrl);
        }
      }
    }
  } finally {
    await browser.close();
  }

  return links;
}

async function checkLink(url) {
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'user-agent': 'SpectrumOfStrengths-link-monitor/1.0' },
      signal: AbortSignal.timeout(requestTimeout),
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'SpectrumOfStrengths-link-monitor/1.0' },
        signal: AbortSignal.timeout(requestTimeout),
      });
    }

    const statusIsRestrictedButReachable = [401, 403, 429].includes(response.status);
    return {
      finalUrl: response.url,
      restricted: statusIsRestrictedButReachable,
      status: response.status,
      url,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      url,
    };
  }
}

let previewServer;
try {
  const siteUrl = configuredSiteUrl || localSiteUrl;
  if (!configuredSiteUrl) {
    previewServer = await startPreview();
  }

  const [english, french] = await loadLocales();
  const routePaths = getRoutePaths(english, french);
  const links = await findExternalLinks(siteUrl, routePaths);
  const results = await Promise.all([...links.keys()].map((url) => checkLink(url)));
  const failures = results.filter(({ error, status }) => error || (status >= 400 && ![401, 403, 429].includes(status)));

  console.log(`Checked ${results.length} external links across ${routePaths.length} localized routes.`);
  for (const result of results) {
    const source = links.get(result.url);
    if (result.error) {
      console.error(`FAIL ${result.url} (found on ${source}): ${result.error}`);
    } else if (result.restricted) {
      console.warn(`WARN ${result.status} ${result.url} (found on ${source}; access restricted)`);
    } else {
      console.log(`OK ${result.status} ${result.url}`);
    }
  }

  if (failures.length > 0) {
    process.exitCode = 1;
  }
} finally {
  previewServer?.kill('SIGTERM');
}
