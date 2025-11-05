import { test, expect } from '@playwright/test';

test('Product search functionality @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Locate and fill the search input
  await page.getByRole('searchbox').fill('hammer');
  
  // Submit the search
  await page.getByRole('searchbox').press('Enter');

  // Wait for the search results or shop/category page to load
  await expect(page).toHaveURL(/(?:shop|search|category)/);

  // Give the page time to load and update with search results
  await page.waitForTimeout(2000);
  const productSelectors = ['.product-item', '.product', '.shelf-item', 'a[href*="/product"]', '[data-hook*="product"]', 'article'];
  let found = false;
  for (const sel of productSelectors) {
    try {
      await expect(page.locator(sel).first()).toBeVisible({ timeout: 3000 });
      found = true;
      break;
    } catch (e) {
      // try next selector
    }
  }
  if (!found) throw new Error('No product results found for the search.');
});