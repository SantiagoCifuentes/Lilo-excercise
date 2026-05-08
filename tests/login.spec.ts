import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { testData } from '../src/testData';

test('locked out user sees an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Login as locked out user
  await loginPage.goto(testData.baseUrl);
  await loginPage.login(testData.users.lockedOut, testData.password);

  // Verify the error state
  await expect(loginPage.lockedOutError).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});
