import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './Base.page'

export class QuotationsPage extends BasePage {
    readonly quotationsSidebar: Locator;
    readonly newQuotationButton: Locator;
    readonly newQuotationText: Locator;
    
    constructor(page: Page) {
        super(page)
        this.quotationsSidebar = page.getByText('Quotations', { exact: true });
        this.newQuotationButton = page.getByRole('button', { name: 'New Quotation' });
        this.newQuotationText = page.getByRole('heading', { name: 'New Quotation' })
    }


    async verifyNewQuotationButtonIsVisible() {
        await expect(this.quotationsSidebar).toBeVisible({ timeout: 6000 });
        await this.quotationsSidebar.click();
        await expect(this.newQuotationButton).toBeVisible({ timeout: 6000 });
        await this.newQuotationButton.scrollIntoViewIfNeeded();
        await this.newQuotationButton.waitFor({ state: 'visible', timeout: 6000 });
        await this.newQuotationButton.click();
    }
    
    
    async verifyNewQuotationTextIsVisible(){
   await expect(this.newQuotationText).toBeVisible({ timeout: 6000 });
}
}