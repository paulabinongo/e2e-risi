import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base.page';
import {selectors, loginRoute, pageTitle, getCredentials, RoleType} from '../../config/environment';

export class LoginPage extends BasePage {
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly signInButton: Locator;

constructor(page: Page){
    super(page)
    
    this.usernameInput = page.locator(selectors.usernameInput);
    this.passwordInput = page.locator(selectors.passwordInput);
    this.signInButton = page.locator(selectors.signInButton);
}

async openPortal(){
    await this.navigateTo(loginRoute)
    await this.verifyLoginPageTitle(pageTitle)
}

async loginAsRole(role: RoleType){
    const account = getCredentials(role);

    await this.usernameInput.fill(account.username);
    await this.passwordInput.fill(account.password);
    await this.signInButton.click();
}
}


