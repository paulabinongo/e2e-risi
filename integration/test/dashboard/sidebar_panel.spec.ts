import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { currentRole, capitalizedApp } from '../../../config/environment';

test.describe('Dashbord Page Functional Tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
    })

    test("User should be able to be redirected to the Dashboard page", async ({page}) => {
        await dashboardPage.verifyDashboardIsVisible();
    })

      test("User should be able to be redirected to the My Activity Sidebar page", async ({page}) => {
        await dashboardPage.verifyMyActivityIsVisible();
    })

})