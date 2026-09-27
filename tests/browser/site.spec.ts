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

test('does not offer newsletter signup in the first-stage site', async ({ page }) => {
  await page.goto(homePage);
  await expect(page.locator('header button.actionButton')).toHaveCount(0);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test.describe('home value carousel', () => {
  test('allows visitors to pause rotation and move through the values', async ({ page }) => {
    await page.clock.install();
    await page.goto(homePage);

    const carousel = page.getByRole('group', { name: 'Four ways of thinking about value', exact: true });
    await carousel.getByRole('button', { name: 'Pause rotation' }).click();
    await expect(carousel.getByRole('button', { name: 'Resume rotation' })).toBeVisible();

    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 1 of 4' })).toBeVisible();

    await carousel.getByRole('button', { name: 'Next value' }).click();
    await expect(carousel.getByRole('group', { name: 'Slide 2 of 4' })).toContainText('Value transformation');
    await expect(page.getByRole('status')).toHaveText('Value transformation, 2 of 4');
  });

  test('stops rotation when keyboard focus enters the carousel', async ({ page }) => {
    await page.clock.install();
    await page.goto(homePage);

    const carousel = page.getByRole('group', { name: 'Four ways of thinking about value', exact: true });
    await carousel.getByRole('button', { name: 'Pause rotation' }).focus();
    await expect(carousel.getByRole('button', { name: 'Pause rotation' })).toBeVisible();

    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 1 of 4' })).toBeVisible();
  });

  test('stops rotation on pointer hover until the visitor resumes it', async ({ page }) => {
    await page.clock.install();
    await page.goto(homePage);

    const carousel = page.getByRole('group', { name: 'Four ways of thinking about value', exact: true });
    await carousel.hover();
    await expect(carousel.getByRole('button', { name: 'Pause rotation' })).toBeVisible();
    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 1 of 4' })).toBeVisible();

    await carousel.getByRole('button', { name: 'Pause rotation' }).click();
    await expect(carousel.getByRole('button', { name: 'Resume rotation' })).toBeVisible();
    await carousel.getByRole('button', { name: 'Resume rotation' }).click();
    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 2 of 4' })).toBeVisible();
  });

  test('provides translated controls and announcements in French', async ({ page }) => {
    await page.goto('index.html#/fr');

    const carousel = page.getByRole('group', { name: 'Quatre façons de penser la valeur', exact: true });
    await carousel.getByRole('button', { name: 'Valeur suivante' }).click();
    await expect(carousel.getByRole('group', { name: 'Diapositive 2 sur 4' })).toContainText('Transformation de la valeur');
    await expect(page.getByRole('status')).toHaveText('Transformation de la valeur, 2 sur 4');
  });
});

test.describe('archive themes carousel', () => {
  test('rotates slowly and lets visitors pause and browse in English', async ({ page }) => {
    await page.clock.install();
    await page.goto('index.html#/archive');

    const carousel = page.getByRole('group', { name: 'What the record will include', exact: true });
    await expect(carousel.getByRole('group', { name: 'Slide 1 of 5' })).toContainText('Heritage and systems');
    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 2 of 5' })).toContainText('Research and evidence');

    await carousel.getByRole('button', { name: 'Pause rotation' }).click();
    await page.clock.fastForward(28_000);
    await expect(carousel.getByRole('group', { name: 'Slide 2 of 5' })).toBeVisible();
    await carousel.getByRole('button', { name: 'Next theme' }).click();
    await expect(carousel.getByRole('group', { name: 'Slide 3 of 5' })).toContainText('Lived experience');
    await expect(page.getByRole('status')).toHaveText('Lived experience, 3 of 5');
  });

  test('shows French controls and a static layout for reduced motion', async ({ page }) => {
    await page.goto('index.html#/fr/archives');
    const carousel = page.getByRole('group', { name: 'Ce que le dossier réunira', exact: true });
    await carousel.getByRole('button', { name: 'Thème suivant' }).click();
    await expect(carousel.getByRole('group', { name: 'Diapositive 2 sur 5' })).toContainText('Recherche et données probantes');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('.archiveCarouselMotion')).toBeHidden();
    await expect(page.locator('.archiveCategories')).toBeVisible();
    await expect(page.locator('.archiveCategories').getByRole('article')).toHaveCount(5);
  });
});

for (const route of [
  {
    language: 'en',
    path: homePage,
    titles: ['Value capture', 'Value transformation', 'Value creation', 'Value preservation'],
  },
  {
    language: 'fr',
    path: 'index.html#/fr',
    titles: ['Captation de valeur', 'Transformation de la valeur', 'Création de valeur', 'Préservation de la valeur'],
  },
] as const) {
  test(`shows all value ideas without rotation under reduced motion in ${route.language}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route.path);

    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await expect(page.locator('.valueCardsStatic')).toBeVisible();
    await expect(page.locator('.valueCarouselMotion')).toBeHidden();
    for (const title of route.titles) {
      await expect(page.locator('.valueCardsStatic').getByRole('heading', { name: title })).toBeVisible();
    }
  });
}

const policyRoutes = [
  { language: 'en', path: 'index.html#/terms-of-use-and-privacy', sectionCount: 4 },
  { language: 'fr', path: 'index.html#/fr/conditions-dutilisation-politique-confidentialite', sectionCount: 4 },
  { language: 'en', path: 'index.html#/accessibility-standards', sectionCount: 2 },
  { language: 'fr', path: 'index.html#/fr/normes-daccessibilite', sectionCount: 2 },
] as const;

test('publishes the opening record in English and French with the same date', async ({ page }) => {
  const dates: string[] = [];

  for (const route of [
    {
      path: 'index.html#/archive',
      language: 'en',
      title: 'Spectrum of Strengths opens its public record',
      status: 'Confirmed',
      future: 'future community centres',
    },
    {
      path: 'index.html#/fr/archives',
      language: 'fr',
      title: 'Spectrum of Strengths ouvre son dossier public',
      status: 'Confirmé',
      future: 'futurs centres communautaires',
    },
  ] as const) {
    await page.goto(route.path);
    const entry = page.locator('.archiveEntry');

    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await expect(entry).toHaveCount(1);
    await expect(entry.getByRole('heading', { name: route.title })).toBeVisible();
    await expect(entry).toContainText(route.status);
    await expect(entry).toContainText(route.future);
    await expect(page.locator('.archiveEmpty')).toHaveCount(0);
    await expect(entry.locator('time')).toHaveCount(1);
    dates.push((await entry.locator('time').getAttribute('dateTime')) ?? '');
  }

  expect(dates[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(dates[1]).toBe(dates[0]);
});

test('identifies GitHub Pages hosting in both privacy summaries', async ({ page }) => {
  for (const path of [
    'index.html#/terms-of-use-and-privacy',
    'index.html#/fr/conditions-dutilisation-politique-confidentialite',
  ]) {
    await page.goto(path);
    await expect(page.locator('main')).toContainText('GitHub Pages');
    await expect(page.locator('main')).toContainText(/IP|adresse IP/);
    await expect(page.locator('main a[href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages"]')).toBeVisible();
  }
});

test('advertises the current public address to link previews', async ({ page }) => {
  await page.goto(homePage);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://kommunarr.github.io/spectrum-of-strengths/',
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://kommunarr.github.io/spectrum-of-strengths/',
  );
});

for (const route of policyRoutes) {
  test(`keeps policy page sections semantic for ${route.path}`, async ({ page }) => {
    await page.goto(route.path);

    const policy = page.locator('main article.policyPage');
    const sections = policy.locator(':scope > section');
    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await expect(policy.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(sections).toHaveCount(route.sectionCount);
    await expect(sections.getByRole('heading', { level: 2 })).toHaveCount(route.sectionCount);
    await expect(sections.locator('p')).toHaveCount(route.sectionCount);
  });
}

for (const route of [
  { language: 'en', path: homePage, label: 'Skip to main content' },
  { language: 'fr', path: 'index.html#/fr', label: 'Passer au contenu principal' },
] as const) {
  test(`shows a visible keyboard skip link in ${route.language}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: route.label });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveCSS('outline-style', 'solid');
    await expect(skipLink).toHaveCSS('outline-width', '3px');
  });
}

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

test.describe('narrow layout contracts', () => {
  test.use({ viewport: { width: 640, height: 900 } });

  test('keeps every published page within a narrow reflow viewport', async ({ page }) => {
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

test('shows that contact is in development without collecting a message', async ({ page }) => {
  await page.goto('index.html#/contact-us');
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
  await expect(page.getByText('Contact options are in development. This page does not accept or send messages.')).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});

for (const route of publishedRoutes) {
  test(`keeps the ${route.name} page healthy`, async ({ page }) => {
    await expectHealthyPage(page, route);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, results.violations.map((violation) => violation.id).join(', ')).toEqual([]);
  });
}
