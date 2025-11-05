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
   
  // Wait briefly for dynamic results to render, then look for product entries
  await page.waitForTimeout(1500);
  // The site renders products inside a gallery/list. Prefer anchor or gallery item selectors we observed:
  // - .c2Zj9x > li a  (gallery item link)
  // - a.oQUvqL or .AJctir (image/link anchors)
  // - .ETPbIy (product item container)
  const productLocator = page.locator('.c2Zj9x > li a, .a0WjOo a.oQUvqL, .a0WjOo .AJctir, .ETPbIy, a[href*="/product"]');
  await expect(productLocator.first()).toBeVisible({ timeout: 10000 });
});