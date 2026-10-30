import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { currentRole, capitalizedApp } from '../../../config/environment';

test.describe('Login Page', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
    });

    test(`User should be able to login to the ${capitalizedApp} App - Login Page with the correct credentials`, async ({page}) => {
        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
        
        const dashboardHeading = page.locator ('h1, h2, div', {hasText: 'Dashboard'}).first()
        await expect(dashboardHeading).toBeVisible({timeout: 10000});
        await expect(page).toHaveURL('/dashboard');
        await page.pause;
    });
});
