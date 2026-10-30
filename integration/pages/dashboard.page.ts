import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class DashboardPage extends BasePage {
    readonly dashboardHeading: Locator;

constructor(page: Page){
super(page)

this.dashboardHeading = page.locator('h1, h2, h3, div', {hasText: 'Dashboard'}).first();
}
async verifyDashboardIsVisible(){
    await expect(this.dashboardHeading).toBeVisible({timeout: 1000});
}
}
