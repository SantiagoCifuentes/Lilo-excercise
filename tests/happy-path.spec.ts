import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

test('standard user can buy two items successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto(process.env.BASE_URL!);
  await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

  // Verify inventory page
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toBeVisible();

  // Add two items to the cart
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bike Light');

  // Verify cart badge shows 2 items
  await expect(inventoryPage.cartBadge).toHaveText('2');

  // Go to cart and verify items are present
  await inventoryPage.navigateToCart();

  await expect(cartPage.itemNames).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);

  // Proceed to checkout and fill customer information
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '12345');

  // Verify checkout overview page and items
  await expect(checkoutPage.itemNames).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);

  // Finish checkout and verify order confirmation
  await checkoutPage.finish();
  await expect(checkoutPage.orderCompleteHeading).toBeVisible();
});
