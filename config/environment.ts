import { env } from "node:process";

export type AppType = 'sales' | 'pricing';
export type EnvType = 'local' | 'dev' | 'staging' | 'prod';
export type RoleType = 'admin' | 'manager' | 'guest';
export type QuotationPurposeType = 'buying' | 'estimates';

declare const process: {
    env: Record<string, string | undefined>;
};

interface Credentials {
    username: string;
    password: string;
}

export const currentApp = (process.env.APP || 'sales').toLowerCase() as AppType;
export const currentEnv = (process.env.ENV || 'dev').toLowerCase() as EnvType;
export const currentRole = (process.env.ROLE || 'admin').toLowerCase() as RoleType;

const appUpper = currentApp.toUpperCase();
const envUpper = currentEnv === 'staging' ? 'STG' : currentEnv.toUpperCase();

export const baseURL = process.env[`${appUpper}_URL_${envUpper}`] || '';
export const loginRoute = process.env[`${appUpper}_LOGIN_ROUTE`] || '/login';
export const pageTitle = process.env[`${appUpper}_PAGE_TITLE`] || `Regan Industrial - ${currentApp}`;

export const selectors = {
    usernameInput: process.env.SHARED_SELECTOR_USERNAME || 'input[type="email"]',
    passwordInput: process.env.SHARED_SELECTOR_PASSWORD || 'input[type="password"]',
    signInButton: process.env.SHARED_SELECTOR_SIGN_IN_BTN || 'button[type="submit"]',
    showButton: process.env.SHARED_SELECTOR_SHOW_EYE_BTN || 'button[type="button"]',
    hideButton: process.env.SHARED_SELECTOR_HIDE_EYE_BTN || 'button[type="button"]',
    userMenuButton: process.env.SHARED_SELECTOR_USER_MENU_BTN || 'button.flex.items-center.gap-3.w-full.px-3.py-3',
    logoutButton: process.env.SHARED_SELECTOR_LOGOUT_BTN || 'button[role="menuItem"]:has-text("Logout")',
};

export const negativeTestCredentials = {
    mismatchedUsername: process.env.MISMATCHED_USERNAME || 'ddd@mail.com',
    mismatchedPassword: process.env.MISMATCHED_PASSWORD || 'password123',
    nonExistingUsername: process.env.NON_EXISTING_USERNAME || 'test@test.com',
    nonExistingPassword: process.env.NON_EXISTING_PASSWORD || 'password123',
};

export const capitalizedApp = currentApp.charAt(0).toUpperCase() + currentApp.slice(1);
export const quotationPurpose = (process.env.QUOTATION_PURPOSE || 'buying').toLowerCase() as QuotationPurposeType;

export function getCredentials(role: RoleType = currentRole): Credentials {
    const roleUpper = role.toUpperCase();
    const targetPrefix = `${appUpper}_${envUpper}_${roleUpper}`;

    return {
        username: process.env[`${targetPrefix}_USERNAME`] || '',
        password: process.env[`${targetPrefix}_PASSWORD`] || '',
    };
};

export const quotationPreambles = (process.env.QUOTATION_PREAMBLES || '').split('|');

export const discountThreshold = Number(process.env.DISCOUNT_THRESHOLD || 3);

export const getRandomDiscount = (min: number, max: number): number => {
    const safeMin = Math.ceil(min);
    const safeMax = Math.floor(max);
    return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
};

export const singleStandardDiscount = (() => {
    const maxStandard = Math.max(1, Math.min(100, discountThreshold - 1));

    if (process.env.STANDARD_DISCOUNT !== undefined && process.env.STANDARD_DISCOUNT !== ''){
        const envVal = Number(process.env.STANDARD_DISCOUNT);
        if (envVal >= 1 && envVal <= maxStandard){
            return envVal;
        }
    }
  return getRandomDiscount(1, maxStandard);
})();


export const multipleStandardDiscounts = (count: number = 3): number[] => {
    const maxAllowedTotal = Math.min(100, discountThreshold - 1);
    const maxPossibleRows = Math.max(1, maxAllowedTotal);
    const actualCount = Math.min(count, maxPossibleRows);

    const discounts: number[] = [];
    let remainingTotal = maxAllowedTotal;

    for (let i = 0; i < actualCount; i++){
        const remainingSlots = actualCount -i - 1;
        const maxForThisSlot = Math.max(1, remainingTotal - remainingSlots)

        const value = getRandomDiscount(1, maxForThisSlot);
        discounts.push(value);
        remainingTotal -= value;
    }

    return discounts;
}

export const bossApprovalDiscount = (maxCap: number = 100): number => {
    const safeMax = Math.min(100, Math.max(discountThreshold, maxCap))

    if (process.env.BOSS_APPROVAL_DISCOUNT !== undefined && process.env.BOSS_APPROVAL_DISCOUNT !== ''){
        const envVal = Number(process.env.BOSS_APPROVAL_DISCOUNT);
        if (envVal >= discountThreshold && envVal <= safeMax){
            return envVal;
        }
    }
    return getRandomDiscount(discountThreshold, safeMax);
}

export const multipleBossApprovalDiscounts = (count: number = 3): number[] => {
    const maxPossibleRows = Math.max(1, Math.floor(100/discountThreshold));
    const actualCount = Math.min(count, maxPossibleRows);

    const discounts: number[] = [];
    let remainingCapacity = 100;

    for (let i = 0; i < actualCount; i++){
        const remainingSlots = actualCount -i - 1;
        const maxForThisSlot = Math.max(1, remainingCapacity - remainingSlots * discountThreshold)

        const value = bossApprovalDiscount(maxForThisSlot);
        discounts.push(value);
        remainingCapacity -= value;
    }

    return discounts;
};

export const vatOptions = ['vatInclusive', 'vatExclusive'] as const;

export const discountOptions = [
    { type: 'noDiscount', name: 'No Discount'},
    { type: 'singleStandard', name: `Single Discount (< ${discountThreshold}%)`},
    { type: 'multipleStandard', name: `Multiple Discounts (< ${discountThreshold}% Total)`},
    { type: 'singleBossApproval', name: `Single Discount (> ${discountThreshold}% - Needs Boss Approval)`},
    { type: 'multipleBossApproval', name: `Multiple Discounts (> ${discountThreshold}% Total - Needs Boss Approval)`}
] as const;
