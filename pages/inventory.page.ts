// pages/inventory.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly headerTitle: Locator;
  private readonly productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.productItem = page.locator('.inventory_item');
  }

  async verifyOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.headerTitle).toHaveText('Products');
  }

  async verifyProductImage(productName: string, expectedImageUrl: string): Promise<void> {
    // 1. Isolate the specific product container based on its text
    const targetProduct = this.productItem.filter({ hasText: productName });
    
    // 2. Locate the image element inside that specific container
    const productImage = targetProduct.locator('.inventory_item_img img');
    
    // 3. Assert the 'src' attribute contains or equals the expected static path
    await expect(productImage).toHaveAttribute('src', expectedImageUrl);
    
    // Optional: Add a safety check to make sure it's visible and not a broken asset
    await expect(productImage).toBeVisible();
  }
}