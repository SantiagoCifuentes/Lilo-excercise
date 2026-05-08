# Sauce Demo Playwright Exercise

Small Playwright + TypeScript test suite for the Sauce Demo app:

https://www.saucedemo.com/

The project covers the required happy path, failed login, and one intentional bug-hunting test for `problem_user`.

## How to run

Install dependencies:

```bash
npm install
```

Run the full suite:

```bash
npx playwright test
```

The full suite is expected to finish with failures because `tests/problem-user.spec.ts` intentionally catches a documented `problem_user` bug.

To run only the passing scenarios:

```bash
npx playwright test tests/login.spec.ts tests/happy-path.spec.ts
```

If Playwright browsers are not installed on your machine yet, run:

```bash
npx playwright install
```

## Environment

The tests include default Sauce Demo values in `src/testData.ts`, so a local `.env` file is optional.

If you want to override the values locally, copy `.env.example` to `.env`:

```env
BASE_URL=https://www.saucedemo.com/
STANDARD_USER=standard_user
PROBLEM_USER=problem_user
LOCKED_OUT_USER=locked_out_user
PASSWORD=secret_sauce
```

The real `.env` file is ignored by git.

## What is covered

- `standard_user` happy path:
  - login
  - add two products to the cart
  - verify cart contents
  - complete checkout
  - verify order confirmation
- `locked_out_user` failed login:
  - verify the locked-out error message
  - verify the login page remains available
- `problem_user` bug-hunting:
  - verifies the expected add-to-cart behavior for affected inventory items
  - intentionally fails because the app does not update the button or cart badge

## What is skipped

- Full regression coverage for every Sauce Demo user type
- Sorting, menu, logout, and reset app state automation
- Visual validation for the incorrect product images bug
- CI setup, custom reporters, and a large Page Object framework

These were skipped to keep the suite focused on the required scenarios and appropriate for the scale of the exercise.

## Bug caught by the problem_user test

The automated bug-hunting test references this documented issue from `BUGS.MD`:

`Certain inventory items cannot be added to the cart`

The affected products are:

- `Sauce Labs Bolt T-Shirt`
- `Sauce Labs Fleece Jacket`
- `Test.allTheThings() T-Shirt (Red)`

The test asserts the expected behavior: after clicking `Add to cart`, the item button should change to `Remove` and the cart badge should show `1`. For `problem_user`, those assertions fail, matching the bug documented in `BUGS.MD`.

## Project structure

```text
src/pages/
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutPage.ts

tests/
  happy-path.spec.ts
  login.spec.ts
  problem-user.spec.ts

BUGS.MD
.env.example
```

The Page Object Model is intentionally small: page classes store reusable locators and simple actions, while assertions stay in the spec files so the test intent remains easy to read.

## AI tools note

I used ChatGPT/Codex as a coding assistant to help structure the Playwright tests, refactor the tests into a simple Page Object Model, and review the README wording. I kept the test decisions and bug documentation tied to the observed Sauce Demo behavior.
