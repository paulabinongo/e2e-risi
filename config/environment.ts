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
}

export const capitalizedApp = currentApp.charAt(0).toUpperCase() + currentApp.slice(1);
export const quotationPurpose = (process.env.QUOTATION_PURPOSE || 'buying').toLowerCase() as QuotationPurposeType;

export function getCredentials(role: RoleType = currentRole): Credentials {
    const roleUpper = role.toUpperCase();
    const targetPrefix = `${appUpper}_${envUpper}_${roleUpper}`;

    return {
        username: process.env[`${targetPrefix}_USERNAME`] || '',
        password: process.env[`${targetPrefix}_PASSWORD`] || '',
    };
}

export const quotationPreambles = (process.env.QUOTATION_PREAMBLES || '').split('|');

