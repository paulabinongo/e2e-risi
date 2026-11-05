import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { QuotationsPage } from '../../pages/quotations.page';
import { currentRole, capitalizedApp } from '../../../config/environment';

test.describe('Create Quotations Page Functional Tests', () => {
    let loginPage: LoginPage;
    let quotationsPage: QuotationsPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        quotationsPage = new QuotationsPage(page);

        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
    });

    test(`User should be able to create a new quotation for buying on a dynamic selling company in the ${capitalizedApp} App - Quotations Page`, async ({page}) => {
        await quotationsPage.verifyNewQuotationButtonIsVisible();
        await quotationsPage.verifyNewQuotationButtonIsVisible();
        await quotationsPage.verifyNewQuotationTextIsVisible();
   
        // const expectedDate = quotationsPage.getTodaysDateString();
    //     await expect(quotationsPage.quotationDateField).toHaveValue(expectedDate, { timeout: 6000 });
    //     await quotationsPage.selectRandomQuotationCard();

    //     await quotationsPage.addTextForPreambleField('This is a test preamble text for the quotation.');
    });
});