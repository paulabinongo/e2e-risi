export type AppType = 'sales' | 'pricing';
export type EnvType = 'local' | 'dev' | 'staging' | 'prod';
export type RoleType = 'admin' | 'manager' | 'guest';

declare const process: {
    env: Record<string, string | undefined>;
};

interface Credentials {
    username: string;
    password: string;
}

interface AppConfig {
    urls: Record<EnvType, string>;
    loginRoute: string;
    pageTitle: string;
    selectors: {
        usernameInput: string;
        passwordInput: string;
        signInButton: string;
    };
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
};

export const capitalizedApp = currentApp.charAt(0).toUpperCase() + currentApp.slice(1);

export function getCredentials(role: RoleType = currentRole): Credentials {
    const roleUpper = role.toUpperCase();
    const targetPrefix = `${appUpper}_${envUpper}_${roleUpper}`;

    return {
        username: process.env[`${targetPrefix}_USERNAME`] || '',
        password: process.env[`${targetPrefix}_PASSWORD`] || '',
    };
}
