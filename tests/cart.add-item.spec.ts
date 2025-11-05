import { test, expect } from '@playwright/test';

test('Add item to cart from product detail page @critical', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.shopbricks.co/');
  
  // Search for lumber
  await page.getByRole('searchbox').fill('lumber');
  await page.getByRole('searchbox').press('Enter');

  // Wait for the search results or shop/category page to load before interacting with products
  await expect(page).toHaveURL(/(?:shop|search|category)/);

  // Click the first product in the search results
  await page.locator('.product-item').first().click();
  
  // Wait for product detail page to load
  await expect(page.locator('.product-detail')).toBeVisible();
  
  // Click Add to Cart button
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Assert that the cart count updates to 1
  await expect(page.locator('.cart-count')).toHaveText('1');
});