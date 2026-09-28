import { expect, test } from '@playwright/test';

for (const route of [
  { language: 'en', path: './' },
  { language: 'en', path: 'events/' },
  { language: 'fr', path: 'fr/contactez-nous/' },
] as const) {
  test(`renders ${route.path} in ${route.language} without layout errors`, async ({ page }) => {
    await page.goto(route.path);

    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();

    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  });
}

test('switches from English to French on every supported browser', async ({ page }) => {
  await page.goto('./');
  await page.locator('header nav a[href="/spectrum-of-strengths/events/"]').click();
  await expect(page).toHaveURL(/\/events\/?$/);

  await page.locator('header .topRow a[lang="fr"]').click();
  await expect.poll(() => decodeURIComponent(page.url())).toMatch(/\/fr\/événements\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});
