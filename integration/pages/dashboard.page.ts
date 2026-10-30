import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class DashboardPage extends BasePage {
    readonly dashboardSidebar: Locator;
    readonly myActivitySidebar: Locator;

constructor(page: Page){
super(page)

this.dashboardSidebar = page.locator('h1, h2, h3, div', {hasText: 'Dashboard'}).first();
this.myActivitySidebar = page.getByRole('link', {name: 'My Activity'});
}
async verifyDashboardIsVisible(){
    await expect(this.dashboardSidebar).toBeVisible({timeout: 1000});
}

async verifyMyActivityIsVisible(){
    await this.myActivitySidebar.waitFor({state: 'visible'})
    await expect(this.myActivitySidebar).toBeVisible({timeout: 1000});
    await this.myActivitySidebar.click();

}
}
