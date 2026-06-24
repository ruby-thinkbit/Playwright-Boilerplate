import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private readonly homeButton: Locator;
    private readonly categoryMenu: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly compareButton: Locator;
    private readonly wishlistButton: Locator;
    private readonly cartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.homeButton = page.getByRole('link', { name: 'Home' });
        this.categoryMenu = page.getByRole('navigation', { name: 'Categories' });
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.compareButton = page.getByRole('button', { name: 'Compare' });
        this.wishlistButton = page.getByRole('button', { name: 'Wishlist' });
        this.cartButton = page.getByRole('button', { name: 'Cart' });
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async navigateToHomeButton(){
        await this.homeButton.click();
    }
}
