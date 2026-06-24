import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PasswordHelper } from '../helpers/generate_random';

// Grouping related tests together
test.describe('E-Commerce Login Functionality', () => {
  let loginPage: LoginPage;

  // Runs before every single test in this block
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Retrieve environment variables securely
    const email = process.env.USER_EMAIL!;
    const password = process.env.USER_PASSWORD!;

    // Perform login action
    await loginPage.login(email, password);

    // Enterprise Web Assertion: Asserting user state change
    // We expect the URL or title to change confirming successful login
    await expect(page).toHaveTitle('My Account');
    await expect(page).toHaveURL(/.*route=account\/account/);
  });

  test('should display error message with invalid credentials', async ({ page }) => {
    // Retrieve environment variables securely
    const email = process.env.USER_EMAIL!;
    const password = PasswordHelper.generatePassword();

    // Perform login action
    await loginPage.login(email, password);

    // Enterprise Web Assertion: Asserting user state change
    // We expect the URL or title to change confirming successful login
    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL(/.*route=account\/login/);
    await expect(page.getByText('Warning: No match for E-Mail Address and/or Password.')).toBeVisible();
  });
});