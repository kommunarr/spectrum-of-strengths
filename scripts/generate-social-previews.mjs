import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const logo = await readFile(resolve('src/assets/SpectrumOfStrengthsLogo.svg'));
const logoUrl = `data:image/svg+xml;base64,${logo.toString('base64')}`;
const cards = [
  {
    language: 'en',
    title: 'We ARE the Spectrum.',
    theme: 'Heritage · systems · visionary leadership',
  },
  {
    language: 'fr',
    title: 'Nous sommes le spectre.',
    theme: 'Patrimoine · systèmes · leadership visionnaire',
  },
];

const browser = await chromium.launch({ headless: true });
try {
  for (const card of cards) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.setContent(`<!doctype html>
      <html lang="${card.language}">
        <head><meta charset="utf-8" /><style>
          * { box-sizing: border-box; }
          html, body { width: 1200px; height: 630px; margin: 0; }
          body { font-family: Arial, "Liberation Sans", sans-serif; color: #17151a;
            background: linear-gradient(125deg, #f2f8fa 0%, #f8f5fa 58%, #fff8ef 100%); }
          main { height: 100%; padding: 52px 72px 55px 88px; border-left: 14px solid #e11584;
            display: flex; flex-direction: column; }
          img { width: 215px; height: 108px; object-fit: contain; object-position: left center; }
          .theme { margin: 46px 0 16px; color: #514b58; font-size: 23px; font-weight: 700;
            letter-spacing: .075em; text-transform: uppercase; }
          h1 { max-width: 1030px; margin: 0; font-size: 79px; letter-spacing: -.035em;
            line-height: 1.07; }
          .brand { margin: auto 0 0; font-size: 29px; font-weight: 700; }
        </style></head>
        <body><main>
          <img src="${logoUrl}" alt="" />
          <p class="theme">${card.theme}</p>
          <h1>${card.title}</h1>
          <p class="brand">Spectrum of Strengths</p>
        </main></body>
      </html>`);
    await page.screenshot({ path: resolve(`public/social-preview-${card.language}.png`) });
    await page.close();
  }
} finally {
  await browser.close();
}
