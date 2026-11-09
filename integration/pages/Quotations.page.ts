import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Base.page'
import { quotationPreambles } from '../../config/environment';

export class QuotationsPage extends BasePage {
    readonly quotationsSidebar: Locator;
    readonly newQuotationButton: Locator;
    readonly newQuotationText: Locator;
    readonly preambleTextInputField: Locator;
    readonly quotationDateField: Locator;
    readonly useThisButton: Locator;
    readonly purposeQuotationButtons: {
        buying: Locator;
        estimates: Locator;
    }
    readonly customerNameOrPhoneDetailInputField: Locator;
    readonly customerNameOrPhoneDetailDropdownField: Locator;
    readonly contactPersonDropdownField: Locator;
    readonly companyNameInputField: Locator;
    readonly companyContactNumberInputField: Locator;
    readonly customerContactNumberInputField: Locator;

    constructor(page: Page) {
        super(page)
        this.quotationsSidebar = page.getByText('Quotations', { exact: true });
        this.newQuotationButton = page.getByRole('button', { name: 'New Quotation' });
        this.newQuotationText = page.getByRole('heading', { name: 'New Quotation' });
        this.preambleTextInputField = page.getByRole('textbox', { name: 'Defaults from the selected' })
        this.quotationDateField = page.getByRole('textbox', { name: 'Quotation date' });
        this.useThisButton = page.getByRole('button', {name: 'USE THIS'});
        this.purposeQuotationButtons = {
            buying: page.getByTestId('quotation-purpose-buying').filter({ hasText: 'For buying'}),
            estimates: page.getByTestId('quotation-purpose-estimate').filter({ hasText: 'For estimate'}),
        }; 
        this.customerNameOrPhoneDetailInputField = page.getByTestId('customer-picker-trigger');
        this.customerNameOrPhoneDetailDropdownField = page.locator('.dropdown-menu, [role="listbox"], ul')
            .locator('div, li')
            .filter({ hasText: 'COMPANY' });
        this.contactPersonDropdownField = page.getByLabel('Contact person');
        this.companyNameInputField = page.getByRole('textbox', { name: 'Defaults from selected' });
        this.companyContactNumberInputField = page.getByTestId('customer-company-phone');
        this.customerContactNumberInputField = page.getByTestId('customer-contact-phone');

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
        await this.preambleTextInputField.click();
        await this.preambleTextInputField.clear();
        await this.preambleTextInputField.pressSequentially(randomPreamble, { delay: 20 });
    }

    async selectQuotationPurpose(purpose: 'buying' | 'estimates'){
        const targetButton = this.purposeQuotationButtons[purpose];
        await targetButton.click();
        await expect(targetButton).toBeVisible();
        
    }

      async selectCustomerName(){
        await this.customerNameOrPhoneDetailInputField.click();
        await this.customerNameOrPhoneDetailDropdownField.first().waitFor({ state: 'visible', timeout: 6000 });
        await this.customerNameOrPhoneDetailDropdownField.last().scrollIntoViewIfNeeded();
        await this.customerNameOrPhoneDetailDropdownField.first().scrollIntoViewIfNeeded();

    

        const customerCount = await this.customerNameOrPhoneDetailDropdownField.count();
        await expect(customerCount).toBeGreaterThan(0);

        const customerNameScroll = Math.floor(Math.random() * customerCount)
        await this.customerNameOrPhoneDetailDropdownField.nth(customerNameScroll).scrollIntoViewIfNeeded();

        const randomCustomerName = Math.floor(Math.random() * customerCount);
        const targetCustomerName = this.customerNameOrPhoneDetailDropdownField.nth(randomCustomerName);

        const fullRowText = await targetCustomerName.innerText();
        const expectedCustomerName = fullRowText.replace('COMPANY', '').replace('Refresh list', '').trim();
        await targetCustomerName.scrollIntoViewIfNeeded();
        await targetCustomerName.click();
        await expect(this.page.getByText(expectedCustomerName).first()).toBeVisible({ timeout: 5000 });


}

}

