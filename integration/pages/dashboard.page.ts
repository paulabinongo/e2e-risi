import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class DashboardPage extends BasePage {
    readonly dashboardSidebar: Locator;
    readonly myActivitySidebar: Locator;
    readonly marketShareSidebar: Locator;
    readonly encodingSidebar: Locator;

    constructor(page: Page) {
        super(page)

        this.dashboardSidebar = page.getByText('Dashboard', { exact: true });
        this.myActivitySidebar = page.getByText('My Activity', { exact: true });
        this.marketShareSidebar = page.getByText('Market Share', { exact: true });
        this.encodingSidebar = page.getByText('Encoding', { exact: true });
    }

    async verifyDashboardIsVisible() {
        await this.page.waitForURL('**/dashboard', { timeout: 15000 });
        await expect(this.dashboardSidebar).toBeVisible({ timeout: 5000 });
    }

    async verifyMyActivityIsVisible() {
        await expect(this.myActivitySidebar).toBeVisible({ timeout: 6000 });
        await this.myActivitySidebar.click();
    
    }

    async verifyMarketShareIsVisible() {
        await expect(this.marketShareSidebar).toBeVisible({ timeout: 6000 });
        await this.marketShareSidebar.click();
    }

    async verifyEncodingIsVisible() {
        await expect(this.encodingSidebar).toBeVisible({ timeout: 6000 });
        await this.encodingSidebar.click();
    }
}
