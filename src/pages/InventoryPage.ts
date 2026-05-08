import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  itemCard(itemName: string): Locator {
    return this.inventoryItems.filter({ hasText: itemName });
  }

  removeButtonForItem(itemName: string): Locator {
    return this.itemCard(itemName).getByRole('button', { name: 'Remove' });
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.itemCard(itemName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
