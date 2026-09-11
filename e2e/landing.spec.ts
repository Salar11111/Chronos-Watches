import { expect, test } from '@playwright/test';

test('landing page loads with hero content', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Where Time');
  await expect(page.locator('.brand-name').first()).toHaveText('CHRONOS');
});

test('newsletter form validates email', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'auto', block: 'center' }));
  const form = page.locator('#newsletterForm');
  await form.locator('#newsletterEmail').fill('invalid');
  await form.locator('button[type="submit"]').click();
  await page.locator('#formMsg').waitFor({ state: 'visible' });
  await expect(page.locator('#formMsg')).toContainText('valid email');
});

test('collection renders from data', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'auto' }));
  await expect(page.locator('.product-card')).toHaveCount(6);
  await expect(page.locator('.product-name').first()).toHaveText('The Sovereign');
});
