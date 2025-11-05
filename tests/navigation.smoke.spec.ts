import { test, expect } from '@playwright/test';

test('Homepage navigation and Shop Now link @smoke', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Assert that the main site header is visible
  await expect(page.locator('header')).toBeVisible();
  
  // Click the Shop Now link (use .first() to avoid strict locator violations)
  await page.getByRole('link', { name: 'Shop Now' }).first().click();
  
  // Verify navigation to shop page
  await expect(page).toHaveURL(/.*\/shop/);
});