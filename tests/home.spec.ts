import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PasswordHelper } from '../helpers/generate_random';

// Grouping related tests together
test.describe('E-Commerce Home Functionality', () => {
  let homePage: HomePage;

  // Runs before every single test in this block
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test('should display the homepage upon click of the home button', async ({ page }) => {
    // Retrieve environment variables securely
    await homePage.navigateToHomeButton();

    // Enterprise Web Assertion: Asserting user state change
    // We expect the URL or title to change confirming successful login
    await expect(page).toHaveTitle('Your Store');
    await expect(page).toHaveURL(/.*route=common\/home/);
  });
});