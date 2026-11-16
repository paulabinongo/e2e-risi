import { bossApprovalDiscount, standardDiscount, getRandomDiscount } from "../config/environment";
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
        await quotationsPage.applyDiscounts([standardDiscount]);
    } else if (discountType == 'multipleStandard'){
        await quotationsPage.applyDiscounts([1, 1]);
    } else if (discountType === 'singleBossApproval'){
        await quotationsPage.applyDiscounts([bossApprovalDiscount]);
    } else if (discountType === 'multipleBossApproval'){
        await quotationsPage.applyDiscounts([getRandomDiscount(1, 2), bossApprovalDiscount])
    }
}



