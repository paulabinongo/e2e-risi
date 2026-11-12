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
    readonly attentionInputField: Locator;
    readonly projectInputField: Locator;
    readonly vatInclusiveSelector: Locator;
    readonly vatExclusiveSelector: Locator;
    // readonly searchProductInputField: Locator;
    // readonly codeGuideSelector: Locator;
    // readonly browseCatalogSelector: Locator;
    // readonly customLineSelector: Locator;
    // readonly quantityInputField: Locator;

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
        this.customerDropdownContainer = page.getByRole('listbox').locator('visible=true');
        this.customerDropdownItems = this.customerDropdownContainer.getByRole('option');
        this.customerDropdownContainer = page.getByRole('listbox').locator('visible=true');
        this.customerDropdownItems = this.customerDropdownContainer.getByRole('option');
        this.contactPersonDropdownField = page.getByLabel('Contact person');
        this.companyNameInputField = page.getByRole('textbox', { name: 'Defaults from selected' });
        this.companyContactNumberInputField = page.getByTestId('customer-company-phone');
        this.customerContactNumberInputField = page.getByTestId('customer-contact-phone');
        this.attentionInputField = page.getByRole('textbox', { name: 'e.g., Purchasing Department' });
        this.projectInputField = page.getByRole('textbox', { name: 'e.g., Upgrading of Hagonoy' });
        this.vatInclusiveSelector = page.getByRole('button', { name: 'VAT inclusive' });
        this.vatExclusiveSelector = page.getByRole('button', { name: 'VAT exclusive' });

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
        await expect(this.useThisButton.first()).toBeVisible({timeout: 8000});
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
        await this.customerDropdownContainer.waitFor({ state: 'visible', timeout: 8000 });
        const customerCount = await this.customerDropdownItems.count();
        await expect(customerCount).toBeGreaterThan(0);
        const randomCustomerIndex = Math.floor(Math.random() * customerCount);
        const targetCustomerName = this.customerDropdownItems.nth(randomCustomerIndex);
        const fullRowText = await targetCustomerName.innerText();
        const expectedCustomerName = fullRowText.replace('COMPANY', '').replace('Refresh list', '').trim();
        await targetCustomerName.scrollIntoViewIfNeeded();
        await targetCustomerName.click();
        await expect(this.page.getByText(expectedCustomerName).first()).toBeVisible({ timeout: 5000 });
    }

    async verifyOtherCustomerDetailsSection() {
        await this.companyContactNumberInputField.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.contactPersonDropdownField).toBeVisible();
        await expect(this.companyNameInputField).toHaveValue(/^.*$/);
        await expect(this.companyContactNumberInputField).toHaveValue(/^(No number on file|.*)$/);
        await expect(this.customerContactNumberInputField).toHaveValue(/^(—|.*)$/);
    }

    async productWithVATInclusive(){
        await this.vatInclusiveSelector.waitFor({state: 'visible', timeout: 6000});
        await expect(this.vatInclusiveSelector).toBeVisible();
        await this.vatInclusiveSelector.click();
        await expect(this.vatInclusiveSelector).toHaveAttribute('aria-pressed', 'true');
    }

    async productWithVATExclusive(){
        await this.vatExclusiveSelector.waitFor({state: 'visible', timeout: 6000});
        await expect(this.vatExclusiveSelector).toBeVisible();
        await this.vatExclusiveSelector.click();
        await expect(this.vatExclusiveSelector).toHaveAttribute('aria-pressed', 'true');
    }
}
