import { test, expect } from '@playwright/test';
import 'dotenv/config';

const affectedItems = [
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Test.allTheThings() T-Shirt (Red)',
];

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.PROBLEM_USER!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();
});

for (const itemName of affectedItems) {
  test(`BUG: Certain inventory items cannot be added to the cart - ${itemName}`, async ({ page }) => {
    const item = page.locator('[data-test="inventory-item"]').filter({ hasText: itemName });

    await item.getByRole('button', { name: 'Add to cart' }).click();

    await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
}
