import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';

const base = 'http://127.0.0.1:4173/spectrum-of-strengths/';
const routes = [
  { name: 'home-en', path: '' },
  { name: 'events-en', path: '#/events' },
  { name: 'home-fr', path: '#/fr' },
  { name: 'events-fr', path: '#/fr/événements' },
];
const thresholds = {
  accessibility: { minimum: 0.95, fail: true },
  'best-practices': { minimum: 0.9, fail: false },
  performance: { minimum: 0.8, fail: false },
  seo: { minimum: 0.85, fail: false },
};

function reportError(message) {
  console.error(message);
  if (process.env.GITHUB_ACTIONS === 'true') {
    const encoded = message.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
    console.error(`::error title=Lighthouse audit::${encoded}`);
  }
}

async function waitForPreview(server, isReady) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (server.exitCode !== null) throw new Error('Preview server exited before it was ready.');
    if (isReady()) {
      try {
        const response = await fetch(base);
        if (response.ok) return;
      } catch {
        // The preview server has not opened its port yet.
      }
    }
    await delay(200);
  }
  throw new Error('Preview server did not become ready in 20 seconds.');
}

async function main() {
  const server = spawn(process.execPath, [
    'node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1',
    '--port', '4173', '--strictPort',
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  let serverReady = false;
  server.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
    if (String(chunk).includes('Local:')) serverReady = true;
  });
  server.stderr.on('data', (chunk) => process.stderr.write(chunk));
  let chrome;
  let failed = false;

  try {
    await waitForPreview(server, () => serverReady);
    chrome = await chromeLauncher.launch({
      chromePath: process.env.CHROME_PATH || chromium.executablePath(),
      chromeFlags: ['--headless', '--no-sandbox'],
    });
    await mkdir('lighthouse-reports', { recursive: true });

    for (const route of routes) {
      const result = await lighthouse(`${base}${route.path}`, {
        port: chrome.port,
        output: 'html',
        logLevel: 'error',
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false,
        },
      });
      if (!result) throw new Error(`Lighthouse did not return a result for ${route.name}.`);

      await writeFile(`lighthouse-reports/${route.name}.html`, result.report);
      await writeFile(`lighthouse-reports/${route.name}.json`, JSON.stringify(result.lhr, null, 2));

      for (const [category, threshold] of Object.entries(thresholds)) {
        const score = result.lhr.categories[category]?.score;
        if (score === null || score === undefined || score < threshold.minimum) {
          const message = `${route.name}: ${category} ${score ?? 'unavailable'} is below ${threshold.minimum}`;
          if (threshold.fail) {
            reportError(message);
            failed = true;
          } else {
            console.warn(message);
          }
        }
      }
      if (result.lhr.audits['meta-description']?.score !== 1) {
        reportError(`${route.name}: meta description audit failed.`);
        failed = true;
      }
      console.log(`${route.name}: Lighthouse report saved.`);
    }
  } finally {
    if (chrome) await chrome.kill();
    server.kill('SIGTERM');
  }

  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  reportError(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
