import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

const affectedItems = [
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Test.allTheThings() T-Shirt (Red)',
];

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login as problem_user before each affected item check
  await loginPage.goto(process.env.BASE_URL!);
  await loginPage.login(process.env.PROBLEM_USER!, process.env.PASSWORD!);

  await expect(inventoryPage.title).toBeVisible();
});

for (const itemName of affectedItems) {
  test(`BUG: Certain inventory items cannot be added to the cart - ${itemName}`, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Expected behavior: item should be added to the cart
    await inventoryPage.addItemToCart(itemName);

    // This fails for problem_user, matching the bug documented in BUGS.MD
    await expect(inventoryPage.removeButtonForItem(itemName)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
}
