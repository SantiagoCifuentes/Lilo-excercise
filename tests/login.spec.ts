import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../src/pages/LoginPage';

test('locked out user sees an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Login as locked out user
  await loginPage.goto(process.env.BASE_URL!);
  await loginPage.login(process.env.LOCKED_OUT_USER!, process.env.PASSWORD!);

  await expect(loginPage.lockedOutError).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
   //   await expect(loginPage.page).toHaveURL(process.env.BASE_URL!); -- I´d leave this commented as an academic purpose, to show that human in the loop is very important when using IA
});
