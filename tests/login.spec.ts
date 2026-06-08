/*
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { Config } from '../config/env.config';

test.describe('SauceDemo - Authentication Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('Should successfully login with standard user', async () => {
    const { username, password } = Config.users.standard;
    
    await loginPage.login(username, password);
    await inventoryPage.verifyOnInventoryPage();
  });

  test('Should show error for locked out user', async () => {
    const { username, password } = Config.users.lockedOut;
    
    await loginPage.login(username, password);
    await loginPage.verifyErrorMessage('Sorry, this user has been locked out.');
  });

  test('Should show static image for problem user', async () => {
    const { username, password } = Config.users.problem;
    
    await loginPage.login(username, password);
    await inventoryPage.verifyProductImage('Sauce Labs Backpack', '/static/media/sl-404.168b1cce10384b857a6f.jpg');
  });
});