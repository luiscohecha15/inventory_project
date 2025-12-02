import { test, expect } from '@playwright/test';

test.describe('Inventory E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page with navigation', async ({ page }) => {
    await expect(page).toHaveTitle(/.*Inventory.*/);
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Product' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Category' })).toBeVisible();
  });

  test('should navigate to create category page', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Category' }).click();
    await expect(page.getByRole('heading', { name: 'Create Category' })).toBeVisible();
    await expect(page.getByRole('button', { name: /create/i })).toBeVisible();
  });

  test('should create a category and navigate back', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Category' }).click();
    
    const categoryName = `Category-${Date.now()}`;
    await page.getByRole('textbox').fill(categoryName);
    await page.getByRole('button', { name: /create/i }).click();

    // Wait for the backend to create the category and then for the UI to navigate
    await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle' }),
  
]);


    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to create product page', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Product' }).click();
    await expect(page.getByRole('heading', { name: 'Create Product' })).toBeVisible();
  });

  test('should load categories in product creation form', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Product' }).click();
    // Wait for categories API and for the select options to appear
    await page.waitForResponse((resp) => resp.url().includes('/api/categories') && resp.status() === 200, { timeout: 10000 });

    const options = await page.locator('select option').count();
    expect(options).toBeGreaterThan(1); 
  });

  test('should create a product with all fields', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Product' }).click();
    // Wait for categories to load
    await page.waitForResponse((resp) => resp.url().includes('/api/categories') && resp.status() === 200, { timeout: 10000 });

    const productName = `SillagamerTestE2E-${Date.now()}`;
    const inputs = page.getByRole('textbox');
    
    await inputs.nth(0).fill(productName);
    await inputs.nth(1).fill('High-performance laptop');
    
    const numberInputs = page.getByRole('spinbutton');
    await numberInputs.nth(0).fill('1200');
    await numberInputs.nth(1).fill('5');
    
    await page.locator('select').selectOption({ index: 1 });
    await page.getByRole('button', { name: /create/i }).click();

    // Wait for the backend to create the product and UI navigation
    await page.waitForResponse(
      (resp) => resp.url().includes('/api/products') && (resp.status() === 201 || resp.status() === 200),
      { timeout: 10000 }
    );

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible({ timeout: 10000 });
  });

  test('should display products in the table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible();
    
    const headerCells = page.locator('table thead th');
    await expect(headerCells.nth(0)).toContainText('Name');
    await expect(headerCells.nth(1)).toContainText('Category');
    await expect(headerCells.nth(2)).toContainText('Price');
    await expect(headerCells.nth(3)).toContainText('Stock');
  });

  test('complete flow: create category and product', async ({ page }) => {
    const categoryName = `TestCat-${Date.now()}`;
    const productName = `TestProduct-${Date.now()}`;

    // Step 1: Create category
    await page.getByRole('link', { name: 'Create Category' }).click();
    await page.getByRole('textbox').fill(categoryName);
    await page.getByRole('button', { name: /create/i }).click();
    await page.waitForResponse(
      (resp) => resp.url().includes('/api/categories') && (resp.status() === 201 || resp.status() === 200),
      { timeout: 10000 }
    );
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible({ timeout: 10000 });

    // Step 2: Create product
    await page.getByRole('link', { name: 'Create Product' }).click();
    await page.waitForResponse((resp) => resp.url().includes('/api/categories') && resp.status() === 200, { timeout: 10000 });

    const inputs = page.getByRole('textbox');
    await inputs.nth(0).fill(productName);
    await inputs.nth(1).fill('Test product description');

    const numberInputs = page.getByRole('spinbutton');
    await numberInputs.nth(0).fill('99');
    await numberInputs.nth(1).fill('10');

    await page.locator('select').selectOption({ index: 1 });
    await page.getByRole('button', { name: /create/i }).click();

    // Should be back on products page
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });
});
