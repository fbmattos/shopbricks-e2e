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
  // FIX 2: Click the first product in the results (gallery anchor). This is simpler and reliable for this site.
  const firstProductAnchor = page.locator('ul.S4WbK_.uQ5Uah.a0WjOo li a').first();
  await expect(firstProductAnchor).toBeVisible({ timeout: 5000 });
  await firstProductAnchor.click();

  // Wait for the Add to Cart button on the product page to appear, then click it
  const addToCartBtn = page.getByRole('button', { name: /Add to Cart/i });
  await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
  await addToCartBtn.click();

  // Assert that the cart shows 1 item (the site displays the count in a span with data-hook Header.itemsCountText)
  const cartCount = page.locator('[data-hook="Header.itemsCountText"]');
  await expect(cartCount).toContainText('1 item', { timeout: 7000 });
});