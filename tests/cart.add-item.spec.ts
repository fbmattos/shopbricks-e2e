import { test, expect } from '@playwright/test';

test('Add item to cart from product detail page @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Search for lumber
  await page.getByRole('searchbox', { name: 'What are you looking for today?' }).fill('lumber');
  await page.getByRole('searchbox', { name: 'What are you looking for today?' }).press('Enter');

  // 1. Assert the page navigated to the search results URL
  await expect(page).toHaveURL(/.*\/search\?/); 

  // FIX 1: Wait for the SEARCH RESULTS heading to confirm the page is fully loaded
  await expect(page.getByRole('heading', { name: 'SEARCH RESULTS' })).toBeVisible();

  // FIX 2: Use a robust gallery-aware product locator (match gallery anchors/containers)
  const productLocator = page.locator('.c2Zj9x > li a, .a0WjOo a.oQUvqL, .a0WjOo .AJctir, .ETPbIy, a[href*="/product"]');
  await expect(productLocator.first()).toBeVisible({ timeout: 10000 });

  // Click the first product and wait for navigation to the product detail page
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    productLocator.first().click(),
  ]);

  // Wait for product-detail to render; try multiple possible selectors
  const detailSelectors = ['.product-detail', '.product-page', '[data-hook*="product-page"]', 'main article', '.ETPbIy', 'h1'];
  let detailFound = false;
  for (const sel of detailSelectors) {
    try {
      await expect(page.locator(sel)).toBeVisible({ timeout: 3000 });
      detailFound = true;
      break;
    } catch (e) {
      // try the next selector
    }
  }
  // As a fallback, ensure the URL looks like a product page
  if (!detailFound) {
    await expect(page).toHaveURL(/(?:product|item|\/product|\/p\/)/, { timeout: 5000 });
  }

  // Click Add to Cart button
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Assert that the cart count updates to 1
  await expect(page.locator('.cart-count')).toHaveText('1');
});