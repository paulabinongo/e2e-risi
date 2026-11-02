import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base.page';
import {selectors, loginRoute, pageTitle, getCredentials, RoleType, negativeTestCredentials} from '../../config/environment';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly showButton: Locator;
    readonly hideButton: Locator;
    readonly userMenuButton: Locator;
    readonly logoutButton: Locator;

constructor(page: Page){
    super(page)
    
    this.usernameInput = page.locator(selectors.usernameInput);
    this.passwordInput = page.locator(selectors.passwordInput);
    this.signInButton = page.locator(selectors.signInButton);
    this.showButton = page.locator(selectors.showButton);
    this.hideButton = page.locator(selectors.hideButton);
    this.userMenuButton = page.locator(selectors.userMenuButton);
    this.logoutButton = page.locator(selectors.logoutButton);

}

async openPortal(){
    await this.navigateTo(loginRoute)
    await this.verifyLoginPageTitle(pageTitle)
}

async loginAsRole(role: RoleType){
    const account = getCredentials(role);

    await this.usernameInput.fill(account.username);
    await this.passwordInput.fill(account.password);
    await this.showButton.click();
    await this.hideButton.click();
    await this.signInButton.click();
}

async loginWithMismatchedCredentials(usernameInput = negativeTestCredentials.mismatchedUsername, passwordInput = negativeTestCredentials.mismatchedPassword){
    await this.usernameInput.fill(usernameInput);
    await this.passwordInput.fill(passwordInput);
    await this.showButton.click();
    await this.signInButton.click();
}

async loginWithNonExistingUser(usernameInput = negativeTestCredentials.nonExistingUsername, passwordInput = negativeTestCredentials.nonExistingPassword){
    await this.usernameInput.fill(usernameInput);
    await this.passwordInput.fill(passwordInput);
    await this.showButton.click();
    await this.signInButton.click();
}

async clickShowPasswordButton(){
    await this.showButton.click();
}

async clickHidePasswordButton(){
    await this.hideButton.click();
}

async clickUserMenuButton(){
    await this.userMenuButton.waitFor({ state: 'visible' });
    await this.userMenuButton.click({force: true});
}

async clickLogoutButton(){
    await this.logoutButton.click();
}

async waitForLoginPageToLoad(){
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
}
}