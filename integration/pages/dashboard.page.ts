import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class DashboardPage extends BasePage {
    readonly dashboardSidebar: Locator;
    readonly myActivitySidebar: Locator;
    readonly marketShareSidebar: Locator;
    readonly encodingSidebar: Locator;
    readonly leadsSidebar: Locator;
    readonly quotationSidebar: Locator;
    readonly salesOrdersSidebar: Locator;
    readonly salesAuditSidebar: Locator;
    readonly serviceRequestsSidebar: Locator;
    readonly jobOrdersSidebar: Locator;
    readonly directorySidebar: Locator;
    readonly inventorySidebar: Locator;
    readonly reportsSidebar: Locator;
    readonly settingsSidebar: Locator;

    constructor(page: Page) {
        super(page)

        this.dashboardSidebar = page.getByText('Dashboard', { exact: true });
        this.myActivitySidebar = page.getByText('My Activity', { exact: true });
        this.marketShareSidebar = page.getByText('Market Share', { exact: true });
        this.encodingSidebar = page.getByText('Encoding', { exact: true });
        this.leadsSidebar = page.getByText('Leads', { exact: true });
        this.quotationSidebar = page.getByText('Quotations', { exact: true });
        this.salesOrdersSidebar = page.getByText('Sales Orders', { exact: true });
        this.salesAuditSidebar = page.getByText('Sales Audit', { exact: true });
        this.serviceRequestsSidebar = page.getByText('Service Requests', { exact: true });
        this.jobOrdersSidebar = page.getByText('Job Orders', { exact: true });
        this.directorySidebar = page.getByText('Directory', { exact: true });
        this.inventorySidebar = page.getByText('Inventory', { exact: true });
        this.reportsSidebar = page.getByText('Reports', { exact: true });
        this.settingsSidebar = page.getByText('Settings', { exact: true });
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

    async verifyLeadsIsVisible() {
        await expect(this.leadsSidebar).toBeVisible({ timeout: 6000 });
        await this.leadsSidebar.click();
    }

    async verifyQuotationsIsVisible() {
        await expect(this.quotationSidebar).toBeVisible({ timeout: 6000 });
        await this.quotationSidebar.click();
    }

    async verifySalesOrdersIsVisible() {
        await expect(this.salesOrdersSidebar).toBeVisible({ timeout: 10000 });
        await this.salesOrdersSidebar.click();
    }

    async verifySalesAuditIsVisible() {
        await expect(this.salesAuditSidebar).toBeVisible({ timeout: 10000 });
        await this.salesAuditSidebar.click();
    }

    async verifyServiceRequestsIsVisible() {
        await expect(this.serviceRequestsSidebar).toBeVisible({ timeout: 10000 });
        await this.serviceRequestsSidebar.click();
    }

    async verifyJobOrdersIsVisible() {
        await expect(this.jobOrdersSidebar).toBeVisible({ timeout: 10000 });
        await this.jobOrdersSidebar.click();
    }

    async verifyDirectoryIsVisible() {
        await expect(this.directorySidebar).toBeVisible({ timeout: 10000 });
        await this.directorySidebar.click();
    }

    async verifyInventoryIsVisible() {
        await expect(this.inventorySidebar).toBeVisible({ timeout: 10000 });
        await this.inventorySidebar.click();
    }

    async verifyReportsIsVisible() {
        await expect(this.reportsSidebar).toBeVisible({ timeout: 10000 });
        await this.reportsSidebar.click();
    }

    async verifySettingsIsVisible() {
        await expect(this.settingsSidebar).toBeVisible({ timeout: 6000 });
        await this.settingsSidebar.click();
    }
}
