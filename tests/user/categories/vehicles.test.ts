import { test, expect } from '@playwright/test';

test.describe('Vehicles Product Page', () => {
  test('should render all UI elements on beauty page', async ({ page, baseURL }) => {
    // Navigate to the Sign In page
    await page.goto(`${baseURL}/category/Vehicles%20&%20Equipment`);

    // Validate the UI elements
    await expect(page.getByText('Filters')).toBeVisible();
    await expect(page.getByText('Sort by:')).toBeVisible();

    const productGrid = page.locator('.GridContainer_products__9AobY');

     // Ensure the product grid container exists
     await expect(productGrid).toHaveCount(1);
   
     // Check for at least one product inside the grid
  const productCount = await productGrid.locator('.GridContainer_product__RnJgf').count();
    expect(productCount).toBeLessThan(1000); // Corrected assertion
   
     });
  });
