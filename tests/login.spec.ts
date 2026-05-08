import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('locked out user sees an error message', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);

    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.LOCKED_OUT_USER!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    //   await expect(page).toHaveURL(process.env.BASE_URL!); -- I´d leave this commented as an academic purpose, to show that human in the loop is very important when using IA
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});
