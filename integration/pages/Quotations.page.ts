import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Base.page'
import { quotationPreambles } from '../../config/environment';

export class QuotationsPage extends BasePage {
    readonly quotationsSidebar: Locator;
    readonly newQuotationButton: Locator;
    readonly newQuotationText: Locator;
    readonly preambleTextField: Locator;
    readonly quotationDateField: Locator;
    readonly useThisButton: Locator;
    readonly purposeQuotationButtons: {
        buying: Locator;
        estimates: Locator;
    }
    constructor(page: Page) {
        super(page)
        this.quotationsSidebar = page.getByText('Quotations', { exact: true });
        this.newQuotationButton = page.getByRole('button', { name: 'New Quotation' });
        this.newQuotationText = page.getByRole('heading', { name: 'New Quotation' });
        this.preambleTextField = page.getByRole('textbox', { name: 'Defaults from the selected' })
        this.quotationDateField = page.getByRole('textbox', { name: 'Quotation date' });
        this.useThisButton = page.getByRole('button', {name: 'USE THIS'});
        this.purposeQuotationButtons = {
            buying: page.getByTestId('quotation-purpose-buying').filter({ hasText: 'For buying'}),
            estimates: page.getByTestId('quotation-purpose-estimate').filter({ hasText: 'For estimate'}),
        }; 
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

    async verifyQuotationDateTime(){
    const today = new Date ();
    const mm = String(today.getMonth() +1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2,'0');
    const yyyy = today.getFullYear();
    const expectedDateTime = `${yyyy}-${mm}-${dd}`;

    await expect(this.quotationDateField).toHaveValue(expectedDateTime);
    }

    getQuotationCard(cardName: string): Locator{
        return this.page.getByRole('button',{
             name: `We\'re delighted to present our quotation for your review. ${cardName} Use this`
        })
    }

    async selectQuotationCard(cardName: string){
        await this.getQuotationCard(cardName).click();
    }

    async selectCardByIndex(index:number){
        await this.useThisButton.nth(index).click()

    }

    async selectRandomQuotationCard(){
        const countCard = await this.useThisButton.count();
        expect (countCard).toBeGreaterThan(0);

        const randomIndex = Math.floor(Math.random() * countCard);
        await this.selectCardByIndex(randomIndex);
    }

    async addPreambleText(){
        const randomPreamble = quotationPreambles[Math.floor(Math.random() * quotationPreambles.length)];
        await this.preambleTextField.click();
        await this.preambleTextField.clear();
        await this.preambleTextField.pressSequentially(randomPreamble, { delay: 20 });
    }

    async selectQuotationPurpose(purpose: 'buying' | 'estimates'){
        const targetButton = this.purposeQuotationButtons[purpose];
        await targetButton.click();
        await expect(targetButton).toBeVisible();
        
    }

}



