import {Page, test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { currentRole, capitalizedApp } from '../../../config/environment';

test.describe.configure({ mode: 'serial' });

test.describe('Dashbord Page Functional Tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.openPortal();
        await loginPage.loginAsRole(currentRole);
    })

    test("User should be able to be redirected to the Notifications page", async ({page}) => {
        await dashboardPage.verifyNotificationsIsVisible();
    })

    test("User should be able to be redirected to the Dashboard page", async ({page}) => {
        await dashboardPage.verifyDashboardIsVisible();
    })

      test("User should be able to be redirected to the My Activity Sidebar page", async ({page}) => {
        await dashboardPage.verifyMyActivityIsVisible();
    })

    test("User should be able to be redirected to the Market Share Sidebar page", async ({page}) => {
        await dashboardPage.verifyMarketShareIsVisible();
    })

    test("User should be able to be redirected to the Encoding Sidebar page", async ({page}) => {
        await dashboardPage.verifyEncodingIsVisible();
    })

    test("User should be able to be redirected to the Leads Sidebar page", async ({page}) => {
        await dashboardPage.verifyLeadsIsVisible();
    })

    test("User should be able to be redirected to the Quotations Sidebar page", async ({page}) => {
        await dashboardPage.verifyQuotationsIsVisible();
    })

    test("User should be able to be redirected to the Sales Orders Sidebar page", async ({page}) => {
        await dashboardPage.verifySalesOrdersIsVisible();
    })

    test("User should be able to be redirected to the Sales Audit Sidebar page", async ({page}) => {
        await dashboardPage.verifySalesAuditIsVisible();
    })

    test("User should be able to be redirected to the Service Requests Sidebar page", async ({page}) => {
        await dashboardPage.verifyServiceRequestsIsVisible();
    })

    test("User should be able to be redirected to the Job Orders Sidebar page", async ({page}) => {
        await dashboardPage.verifyJobOrdersIsVisible();
    })

    test("User should be able to be redirected to the Directory Sidebar page", async ({page}) => {
        await dashboardPage.verifyDirectoryIsVisible();
    })

    test("User should be able to be redirected to the Inventory Sidebar page", async ({page}) => {
        await dashboardPage.verifyInventoryIsVisible();
    })

    test("User should be able to be redirected to the Reports Sidebar page", async ({page}) => {
        await dashboardPage.verifyReportsIsVisible();
    })

    test("User should be able to be redirected to the Settings Sidebar page", async ({page}) => {
        await dashboardPage.verifySettingsIsVisible();
    })

})