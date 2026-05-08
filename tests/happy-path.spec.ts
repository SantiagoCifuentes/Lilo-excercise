import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('standard user can buy two items successfully', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
// Login
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.STANDARD_USER!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
 // Verify login and products page
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
// Add two items to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
// Verify cart badge shows 2 items
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
// Go to cart and verify items are present
  await page.locator('[data-test="shopping-cart-link"]').click();
// Verify both items are in the cart
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
// Proceed to checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
// Fill in checkout information
  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('User');
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
// Verify checkout overview page and items
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
 // Finish checkout
  await page.getByRole('button', { name: 'Finish' }).click();
// Verify order confirmation
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});
