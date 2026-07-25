import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const homePage = 'index.html';

test.describe('navigation and language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(homePage);
  });

  test('navigates to an English page and switches it to French', async ({ page }) => {
    await page.getByRole('link', { name: 'Events' }).click();
    await expect(page).toHaveURL(/#\/events$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Events');

    await page.getByRole('link', { name: 'Français' }).click();
    await expect.poll(() => decodeURIComponent(page.url())).toMatch(/#\/fr\/événements$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Événements');
  });

  test('switches from a French page back to its matching English page', async ({ page }) => {
    await page.goto('index.html#/fr/contactez-nous');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contactez-nous');

    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/#\/contact-us$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact us');
  });
});

test('opens and dismisses the newsletter dialog with focus return', async ({ page }) => {
  await page.goto(homePage);
  const joinButton = page.getByRole('button', { name: 'Join us' }).first();

  await joinButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(joinButton).toBeFocused();
});

test('reports that the contact form is not connected after a valid attempt', async ({ page }) => {
  await page.goto('index.html#/contact-us');
  await page.getByLabel('Name').fill('Test visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject').fill('Test message');
  await page.getByLabel('Message').fill('This is a browser test message.');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('alert')).toContainText('not connected');
  await expect(page.getByText('Thanks for reaching out!')).not.toBeVisible();
});

for (const [name, route] of [
  ['English home', homePage],
  ['French home', 'index.html#/fr'],
  ['English events', 'index.html#/events'],
  ['French events', 'index.html#/fr/événements'],
  ['English contact', 'index.html#/contact-us'],
  ['French contact', 'index.html#/fr/contactez-nous'],
] as const) {
  test(`has no automated accessibility violations on ${name}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations, results.violations.map((violation) => violation.id).join(', ')).toEqual([]);
  });
}
