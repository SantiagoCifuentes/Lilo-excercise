import 'dotenv/config';

export const testData = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
  users: {
    standard: process.env.STANDARD_USER ?? 'standard_user',
    problem: process.env.PROBLEM_USER ?? 'problem_user',
    lockedOut: process.env.LOCKED_OUT_USER ?? 'locked_out_user',
  },
  password: process.env.PASSWORD ?? 'secret_sauce',
};
