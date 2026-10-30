import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { currentRole, capitalizedApp } from '../../../config/environment';

test.describe('Login Page Functional Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
    });

    test(`User should be able to login to the ${capitalizedApp} App - Login Page with the correct credentials`, async ({page}) => {
        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
    });

    test(`User should not be able to login to the ${capitalizedApp} App - Login Page with the mismatched credentials`, async ({page}) => {
        await loginPage.openPortal();
        await loginPage.loginWithMismatchedCredentials();
    });

    test(`User should not be able to login the non-existing users to the ${capitalizedApp} App - Login page`, async ({page})=> {
        await loginPage.openPortal();
        await loginPage.loginWithNonExistingUser();
    })
});
