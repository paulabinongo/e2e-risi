import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './Base.page'

export class QuotationsPage extends BasePage {
    readonly quotationsSidebar: Locator;
    readonly newQuotationButton: Locator;
    readonly newQuotationText: Locator;
    readonly preambleTextField: Locator;
    readonly quotationDateField: Locator;
    readonly useThisButton: Locator;
    
    constructor(page: Page) {
        super(page)
        this.quotationsSidebar = page.getByText('Quotations', { exact: true });
        this.newQuotationButton = page.getByRole('button', { name: 'New Quotation' });
        this.newQuotationText = page.getByRole('heading', { name: 'New Quotation' });
        // this.selectDynamicQuotationCard = page.getByRole('button', { name: 'We\'re delighted to present our quotation for your review. Regan Use this' });
        this.preambleTextField = page.getByRole('textbox', { name: 'Defaults from the selected' })
        this.quotationDateField = page.getByRole('textbox', { name: 'Quotation date' });
        this.useThisButton = page.getByText('USE THIS');
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

    getQuotationCard(cardName: string): Locator{
        return this.page.getByRole('button',{
             name: `We\'re delighted to present our quotation for your review. ${cardName} Use this`
        })
    }

    async selectQuotationCard(cardName: string){
        const quotationCard = this.getQuotationCard(cardName)
        await quotationCard.click();
    }

    async selectCardByIndex(index:number){
        await this.useThisButton.nth(index).click()

    }
}
