import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

const homePage = 'index.html';

type Locale = 'en' | 'fr';

interface PublishedRoute {
  language: Locale;
  name: string;
  path: string;
  testPath: string;
}

function toTestPath(path: string) {
  return path === '/' ? homePage : `index.html#${path}`;
}

function loadEnglishRouteMap() {
  const locale: unknown = JSON.parse(readFileSync(
    new URL('../../src/locales/en-ca/translation.json', import.meta.url),
    'utf8',
  ));

  if (!locale || typeof locale !== 'object' || Array.isArray(locale)) {
    throw new Error('The English locale must be a JSON object.');
  }

  const otherLanguage = (locale as { otherLanguage?: unknown }).otherLanguage;
  if (!otherLanguage || typeof otherLanguage !== 'object' || Array.isArray(otherLanguage)) {
    throw new Error('The English locale must include an otherLanguage object.');
  }

  return Object.fromEntries(
    Object.entries(otherLanguage).map(([path, target]) => {
      if (typeof target !== 'string') {
        throw new Error(`The route mapping for ${path} must be a string.`);
      }
      return [path, target];
    }),
  );
}

const localizedRouteEntries = Object.entries(loadEnglishRouteMap())
  .filter(([path]) => path.startsWith('/'));

const publishedRoutes: PublishedRoute[] = localizedRouteEntries.flatMap(([englishPath, frenchPath]) => [
  {
    language: 'en',
    name: `English ${englishPath}`,
    path: englishPath,
    testPath: toTestPath(englishPath),
  },
  {
    language: 'fr',
    name: `French ${frenchPath}`,
    path: frenchPath,
    testPath: toTestPath(frenchPath),
  },
]);

const knownHashPaths = publishedRoutes.map(({ path }) => path);

async function expectHealthyPage(page: Page, route: PublishedRoute) {
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${String(response.status())} ${response.url()}`);
    }
  });

  await page.goto(route.testPath);
  await expect(page.locator('html')).toHaveAttribute('lang', route.language);
  await expect(page).toHaveTitle(/.+\| Spectrum of Strengths$/);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText(/\S+/);

  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(layout.scrollWidth, `${route.name} has horizontal overflow`).toBeLessThanOrEqual(layout.viewportWidth);

  const linkIssues = await page.locator('a').evaluateAll((anchors: HTMLAnchorElement[], allowedPaths: string[]) => {
    const allowed = new Set(allowedPaths);

    return anchors.flatMap((anchor) => {
      const rawHref = anchor.getAttribute('href')?.trim();
      const label = anchor.textContent?.trim() ?? anchor.getAttribute('aria-label') ?? '<unnamed link>';

      if (!rawHref || rawHref === '#main-content') {
        return rawHref ? [] : [`${label}: empty href`];
      }

      if (rawHref.startsWith('#/')) {
        const routePath = decodeURIComponent(rawHref.slice(1)) || '/';
        return allowed.has(routePath) ? [] : [`${label}: unknown internal route ${routePath}`];
      }

      let href: URL;
      try {
        href = new URL(rawHref, document.baseURI);
      } catch {
        return [`${label}: invalid href ${rawHref}`];
      }

      if (href.protocol === 'mailto:' || href.protocol === 'tel:') {
        return [];
      }

      if (href.origin === window.location.origin) {
        return [`${label}: unexpected same-origin href ${rawHref}`];
      }

      if (href.protocol !== 'https:') {
        return [`${label}: external link is not HTTPS ${rawHref}`];
      }

      if (anchor.target === '_blank') {
        const rel = new Set(anchor.rel.split(/\s+/));
        if (!rel.has('noopener') && !rel.has('noreferrer')) {
          return [`${label}: target=_blank link is missing noopener/noreferrer`];
        }
      }

      return [];
    });
  }, knownHashPaths);

  expect(consoleErrors, `${route.name} console errors`).toEqual([]);
  expect(failedResponses, `${route.name} failed responses`).toEqual([]);
  expect(linkIssues, `${route.name} link issues`).toEqual([]);
}

test.describe('navigation and language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(homePage);
  });

  test('navigates to an English page and switches it to French', async ({ page }) => {
    await page.locator('header nav a[href="#/events"]').click();
    await expect(page).toHaveURL(/#\/events$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main h1')).toBeVisible();

    await page.locator('header .topRow a[lang="fr"]').click();
    await expect.poll(() => decodeURIComponent(page.url())).toMatch(/#\/fr\/événements$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('main h1')).toBeVisible();
  });

  test('switches from a French page back to its matching English page', async ({ page }) => {
    await page.goto('index.html#/fr/contactez-nous');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('main h1')).toBeVisible();

    await page.locator('header .topRow a[lang="en"]').click();
    await expect(page).toHaveURL(/#\/contact-us$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main h1')).toBeVisible();
  });
});

test('opens and dismisses the newsletter dialog with focus return', async ({ page }) => {
  await page.goto(homePage);
  const joinButton = page.locator('header button.actionButton');

  await joinButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('button')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(joinButton).toBeFocused();
});

test.describe('responsive navigation', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test('opens, navigates, and closes the mobile menu accessibly', async ({ page }) => {
    await page.goto(homePage);

    const menuButton = page.getByRole('button', { name: 'Menu' });
    const mobileNavigation = page.locator('#mobile-navigation');
    await menuButton.click();

    await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileNavigation).toBeVisible();
    await expect(page.locator('main')).toBeHidden();

    await mobileNavigation.getByRole('link', { name: 'Events' }).click();
    await expect(page).toHaveURL(/#\/events$/);
    await expect(mobileNavigation).toBeHidden();
    await expect(page.locator('main h1')).toBeVisible();

    await page.getByRole('button', { name: 'Menu' }).click();
    await page.keyboard.press('Escape');
    await expect(mobileNavigation).toBeHidden();
    await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
  });
});

test.describe('mobile layout contracts', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test('keeps every published page within the mobile viewport', async ({ page }) => {
    const overflowRoutes: string[] = [];

    for (const route of publishedRoutes) {
      await page.goto(route.testPath);
      await expect(page.locator('main h1')).toHaveCount(1);

      const layout = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      if (layout.scrollWidth > layout.viewportWidth) {
        overflowRoutes.push(`${route.name} (${String(layout.scrollWidth)}px > ${String(layout.viewportWidth)}px)`);
      }
    }

    expect(overflowRoutes).toEqual([]);
  });
});

test('reports that the contact form is not connected after a valid attempt', async ({ page }) => {
  await page.goto('index.html#/contact-us');
  await page.getByLabel('Name').fill('Test visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject').fill('Test message');
  await page.getByLabel('Message').fill('This is a browser test message.');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('alert')).toContainText('not connected');
  await expect(page.locator('#contact-form-status')).toBeVisible();
});

for (const route of publishedRoutes) {
  test(`keeps the ${route.name} page healthy`, async ({ page }) => {
    await expectHealthyPage(page, route);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, results.violations.map((violation) => violation.id).join(', ')).toEqual([]);
  });
}
