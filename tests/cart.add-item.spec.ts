import { test, expect } from '@playwright/test';

test('Add item to cart from product detail page @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Search for lumber
  await page.getByRole('searchbox').fill('lumber');
  await page.getByRole('searchbox').press('Enter');

  // Wait for the search results or shop/category page to load before interacting with products
  await expect(page).toHaveURL(/(?:shop|search|category)/);

  // Give the page time to load and update with search results
  await page.waitForTimeout(2000);
  const productSelectors = ['.product-item', '.product', '.shelf-item', 'a[href*="/product"]', '[data-hook*="product"]', 'article'];
  let foundSelector: string | null = null;
  for (const sel of productSelectors) {
    try {
      await expect(page.locator(sel).first()).toBeVisible({ timeout: 3000 });
      foundSelector = sel;
      break;
    } catch (e) {
      // try next selector
    }
  }
  if (!foundSelector) throw new Error('No product results found for the search.');
  // Click the first found product and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.locator(foundSelector).first().click()
  ]);

  // Try different selectors for product detail page load
  const detailSelectors = ['.product-detail', '.product-page', '[data-hook*="product-page"]', 'main article'];
  let found = false;
  for (const sel of detailSelectors) {
    try {
      await expect(page.locator(sel)).toBeVisible({ timeout: 3000 });
      found = true;
      break;
    } catch (e) {
      // try next selector
    }
  }
  if (!found) throw new Error('Product detail page did not load.');
  
  // Click Add to Cart button
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Assert that the cart count updates to 1
  await expect(page.locator('.cart-count')).toHaveText('1');
});