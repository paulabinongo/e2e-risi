import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/login.page';
import { QuotationsPage } from '../../../../pages/quotations.page';
import { fillFirstAndSecondQuoationForm, handleDiscount } from '../../../../../helpers/quotation.helper';
import { currentRole, quotationPurpose, vatOptions, discountOptions } from '../../../../../config/environment';

test.describe('Core Quotation Type x VAT Mode x Discount Matrix', () => {
  let loginPage: LoginPage;
  let quotationsPage: QuotationsPage;

  const quotationPurposes = [quotationPurpose as 'buying' | 'estimates'];


  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    loginPage = new LoginPage(page);
    quotationsPage = new QuotationsPage(page);

    await loginPage.openPortal();
    await loginPage.loginAsRole(currentRole);

  });

    for (const purpose of quotationPurposes) {
        for (const vatType of vatOptions) {
            for (const discount of discountOptions){
                const vatLabel = vatType === 'vatInclusive' ? 'VAT Inclusive' : 'VAT Exclusive';
                
                test(`User should be able to create a quotation for ${purpose} with ${vatLabel} and ${discount.name}`, async () => {
                  await fillFirstAndSecondQuoationForm(quotationsPage, purpose, vatType);
                  await handleDiscount(quotationsPage, discount.type);
                });
            };
        };
    };
});