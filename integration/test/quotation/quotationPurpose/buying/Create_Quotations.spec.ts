import {test, expect} from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { QuotationsPage } from '../../../pages/quotations.page';
import { currentRole, capitalizedApp } from '../../../../config/environment';

test.describe('Create Quotations Page Functional Tests', () => {
    let loginPage: LoginPage;
    let quotationsPage: QuotationsPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        quotationsPage = new QuotationsPage(page);

        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
    });

    //TO DO: Implement logic for the selection for the Quotation Purpose (Between Buying and Estimate)
    test(`User should be able to create a new quotation for ${quotationPurpose} on a dynamic selling company in the ${capitalizedApp} App - Quotations Page`, async ({page}) => {
        await quotationsPage.verifyNewQuotationButtonIsVisible();
        await quotationsPage.verifyNewQuotationButtonIsVisible();
        await quotationsPage.verifyNewQuotationTextIsVisible();
   
        // const expectedDate = quotationsPage.getTodaysDateString();
    //     await expect(quotationsPage.quotationDateField).toHaveValue(expectedDate, { timeout: 6000 });
    //     await quotationsPage.selectRandomQuotationCard();

    //     await quotationsPage.addTextForPreambleField('This is a test preamble text for the quotation.');
    
        const totalCards = await quotationsPage.useThisButton.count();
            expect (totalCards).toBeGreaterThan(0);

            for (let selectedCard = 0; selectedCard < totalCards; selectedCard++){
                await quotationsPage.selectCardByIndex(selectedCard);
            }
})

    test(`User should be able to create a new quotation for ${quotationPurpose} for Regan Selling Company in the ${capitalizedApp} App - Quotations Page`, async ({page}) => {

})

   test(`User should be able to create a new quotation for ${quotationPurpose} for Supreme Selling Company in the ${capitalizedApp} App - Quotations Page`, async ({page}) => {

})
   test(`User should be able to create a new quotation for ${quotationPurpose} for Kirin Selling Company in the ${capitalizedApp} App - Quotations Page`, async ({page}) => {

})
})
