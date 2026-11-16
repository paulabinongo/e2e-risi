import { get } from "node:http";
import { bossApprovalDiscount, singleStandardDiscount, getRandomDiscount, multipleStandardDiscounts, multipleBossApprovalDiscounts } from "../config/environment";
import { QuotationsPage } from "../integration/pages/quotations.page";

export async function fillFirstAndSecondQuoationForm(
    quotationsPage: QuotationsPage,
    purpose: 'buying' | 'estimates',
    vatType: string
){
    await quotationsPage.verifyNewQuotationButtonIsVisible();
    await quotationsPage.verifyNewQuotationTextIsVisible();
    await quotationsPage.verifyQuotationDateTime();
    await quotationsPage.selectRandomQuotationCard();
    await quotationsPage.selectQuotationPurpose(purpose);
    await quotationsPage.addPreambleText();
    await quotationsPage.selectCustomerName();
    await quotationsPage.verifyOtherCustomerDetailsSection();

    if (vatType === 'vatInclusive'){
        await quotationsPage.productWithVATInclusive();
    } else {
        await quotationsPage.productWithVATExclusive();
    }
    // await quotationsPage.getProductByCode();
}

export async function handleDiscount(
    quotationsPage: QuotationsPage,
    discountType: string
) {
    if (discountType === 'noDiscount'){
        await quotationsPage.applyDiscounts([]);
    } else if (discountType === 'singleStandard') {
        await quotationsPage.applyDiscounts([singleStandardDiscount]);
    } else if (discountType == 'multipleStandard'){
        const rowCount = getRandomDiscount(2,4);
        await quotationsPage.applyDiscounts(multipleStandardDiscounts(rowCount));
    } else if (discountType === 'singleBossApproval'){
        await quotationsPage.applyDiscounts([bossApprovalDiscount(100)]);
    } else if (discountType === 'multipleBossApproval'){
        const rowCount = getRandomDiscount(2,4);
        await quotationsPage.applyDiscounts(multipleBossApprovalDiscounts(rowCount));
    }
}



