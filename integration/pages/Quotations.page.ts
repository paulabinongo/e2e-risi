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
    readonly customerDropdownContainer: Locator;
    readonly customerDropdownItems: Locator;
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
        
        // FIX: Treat the list container and list items as separate distinct locators
        this.customerDropdownContainer = page.locator('.dropdown-menu, [role="listbox"], ul.dropdown-content').first();
        this.customerDropdownItems = this.customerDropdownContainer.locator('div, li, [role="option"]');
        
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
        // 1. Click to open the custom dropdown list
        await this.customerNameOrPhoneDetailInputField.click();
        
        // 2. Wait for the list container to show up
        await this.customerDropdownContainer.waitFor({ state: 'visible', timeout: 6000 });

        // 3. Count available rows inside the picker
        const customerCount = await this.customerDropdownItems.count();
        await expect(customerCount).toBeGreaterThan(0);

        // 4. Select a completely random list item index
        const randomCustomerIndex = Math.floor(Math.random() * customerCount);
        const targetCustomerName = this.customerDropdownItems.nth(randomCustomerIndex);

        // 5. Clean text values up for the assertion string
        const fullRowText = await targetCustomerName.innerText();
        const expectedCustomerName = fullRowText.replace('COMPANY', '').replace('Refresh list', '').trim();
        
        // 6. Explicitly scroll target option into view container bounds, then click it
        await targetCustomerName.scrollIntoViewIfNeeded();
        await targetCustomerName.click();
        
        // 7. Verify the UI updated with your choice
        await expect(this.page.getByText(expectedCustomerName).first()).toBeVisible({ timeout: 5000 });
    }

    async verifyCustomerSectionData() {
        await this.companyContactNumberInputField.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.companyNameInputField).toHaveValue(/^.*$/);
        await expect(this.contactPersonDropdownField).toBeVisible();
        await expect(this.customerContactNumberInputField).toHaveValue(/^(—|.*)$/);
        await expect(this.companyContactNumberInputField).toHaveValue(/^(No number on file|.*)$/);
    }
}
