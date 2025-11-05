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

  // Click the first product. The site may open a new tab or use client-side routing.
  const context = page.context();
  let productPage = page;
  await productLocator.first().click();
  // If click opened a new page/tab, capture it; otherwise continue on the same page.
  try {
    const newPage = await context.waitForEvent('page', { timeout: 3000 });
    productPage = newPage;
    await productPage.waitForLoadState('load');
  } catch (e) {
    // no new page — proceed with the same page
  }

  // Wait for product-detail to render; try multiple possible selectors or URL patterns
  const detailSelectors = ['.product-detail', '.product-page', '[data-hook*="product-page"]', 'main article', '.ETPbIy', 'h1'];
  let detailFound = false;
  for (const sel of detailSelectors) {
    try {
      await expect(productPage.locator(sel)).toBeVisible({ timeout: 7000 });
      detailFound = true;
      break;
    } catch (e) {
      // try the next selector
    }
  }
  // As a fallback, ensure the URL looks like a product page
  if (!detailFound) {
    await expect(productPage).toHaveURL(/(?:product|item|\/product|\/p\/)/, { timeout: 7000 });
  }

  // Click Add to Cart button
  await productPage.getByRole('button', { name: 'Add to Cart' }).click();

  // Assert that the cart count updates to 1
  await expect(productPage.locator('.cart-count')).toHaveText('1');
});