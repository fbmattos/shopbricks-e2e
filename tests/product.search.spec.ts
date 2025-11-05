import { test, expect } from '@playwright/test';

test('Product search functionality @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Locate and fill the search input
  await page.getByRole('searchbox').fill('hammer');
  
  // Submit the search
  await page.getByRole('searchbox').press('Enter');

  // Wait for the search results page to load
  await expect(page).toHaveURL(/.*\/shop/);

  // Assert that search results are visible
  await expect(page.locator('.product-grid')).toBeVisible();
  
  // Verify at least one product is displayed
  await expect(page.locator('.product-item').first()).toBeVisible();
});