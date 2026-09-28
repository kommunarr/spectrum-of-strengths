import { expect, test } from '@playwright/test';

const stableFont = '* { font-family: "Liberation Sans", Arial, sans-serif !important; }';
const screenshotOptions = { animations: 'disabled' as const, maxDiffPixelRatio: 0.02 };

test.describe('shared shell visual contracts', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('preserves the desktop header and footer', async ({ page }) => {
    await page.goto('./');
    await page.addStyleTag({ content: stableFont });

    await expect(page.locator('header')).toHaveScreenshot('desktop-header.png', screenshotOptions);
    await expect(page.locator('footer')).toHaveScreenshot('desktop-footer.png', screenshotOptions);
  });
});

test.describe('mobile shell visual contracts', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test('preserves the mobile header, footer, and navigation', async ({ page }) => {
    await page.goto('./');
    await page.addStyleTag({ content: stableFont });

    await expect(page.locator('header')).toHaveScreenshot('mobile-header.png', screenshotOptions);
    await expect(page.locator('footer')).toHaveScreenshot('mobile-footer.png', screenshotOptions);

    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.locator('#mobile-navigation')).toHaveScreenshot('mobile-navigation.png', screenshotOptions);
  });
});
