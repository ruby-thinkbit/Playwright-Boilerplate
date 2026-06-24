import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async verifyPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }
}