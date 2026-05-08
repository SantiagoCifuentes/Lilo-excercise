import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';
import { testData } from '../src/testData';

const affectedItems = [
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Test.allTheThings() T-Shirt (Red)',
];

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login as problem_user before each affected item check
  await loginPage.goto(testData.baseUrl);
  await loginPage.login(testData.users.problem, testData.password);

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
