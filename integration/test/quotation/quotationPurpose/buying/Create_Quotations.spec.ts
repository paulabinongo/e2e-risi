import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/login.page';
import { QuotationsPage } from '../../../../pages/quotations.page';
import { currentRole, capitalizedApp, quotationPurpose } from '../../../../../config/environment';

test.describe(`User should be able to create a new quotation for ${quotationPurpose} on a dynamic selling company with VAT inclusive and VAT exclusive in the ${capitalizedApp} App - Quotations Page`, () => {
let loginPage: LoginPage;
    let quotationsPage: QuotationsPage;

    const quotationPurpose: 'buying' | 'estimates' = 'buying';
    const quotationPurposes = [quotationPurpose] as const;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        loginPage = new LoginPage(page);
        quotationsPage = new QuotationsPage(page);

        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);

        for (const purpose of quotationPurposes) {
            await quotationsPage.verifyNewQuotationButtonIsVisible();
            await quotationsPage.verifyNewQuotationTextIsVisible();
            await quotationsPage.verifyQuotationDateTime();
            await quotationsPage.selectRandomQuotationCard();
            await quotationsPage.selectQuotationPurpose(purpose);
            await quotationsPage.addPreambleText();
            await quotationsPage.selectCustomerName();
            await quotationsPage.verifyOtherCustomerDetailsSection();

    }
    });


    const quotationAction = quotationPurpose === 'buying' ? 'to be bought' : 'to be estimated';
    const vatOptions = ['vatInclusive', 'vatExclusive'] as const;

    for (const purpose of quotationPurposes) {
        for (const vatType of vatOptions) {
            const vatLabel = vatType === 'vatInclusive'? 'VAT Inclusive' : 'VAT Exclusive'
            test(`Verify the adding of products ${quotationAction} with ${vatLabel}`, async ({ page }) => {

                if (purpose === 'buying') {
                    await quotationsPage.selectQuotationPurpose('buying');
                } else if (purpose === 'estimates') {
                    await quotationsPage.selectQuotationPurpose('estimates');
                }

                if (vatType === 'vatInclusive') {
                    await quotationsPage.productWithVATInclusive();
                } else if (vatType === 'vatExclusive') {
                    await quotationsPage.productWithVATExclusive();
                }
            });
        }
    }
});
