import { test, expect } from '@playwright/test';

test('Shop page filtering functionality @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Click the Shop Now link (use .first() to avoid strict locator violations)
  await page.getByRole('link', { name: 'Shop Now' }).first().click();
  
  // Wait for shop page to load
  await expect(page).toHaveURL(/.*\/shop/);
  
  // Click the Hardware filter
  await page.getByRole('link', { name: 'Hardware' }).click();
  
  // Assert that the URL contains the filter parameter
  await expect(page).toHaveURL(/.*category=hardware/);
});