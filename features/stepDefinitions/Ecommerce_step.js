const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../PageObjects/POManager');
const { test, expect } = require('@playwright/test')
const playwright = require('@playwright/test');

Given('Login to ecommerce site with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {


    const products = await this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(username, password);
});
When('Add {string} to cart', async function (productName) {
    const dashboardPage = this.poManager.getdashboardPage();
    await dashboardPage.searchProductAddtoCart(productName);
    await dashboardPage.navigatetoCart();
});
Then('Verify {string} is displayed in cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductinCartPresent(productName);
    await cartPage.navigatetoCheckout();
});
When('Enter details in checkout verify {string} and place order', async function (username) {
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.fillCheckoutPageandSubmitOrder("ind", "India", "08", username);
    this.orderId = await this.checkoutPage.getOrderIdDetails();
    console.log(this.orderId);
});
Then('Verify order is present in order history page', async function () {
    await this.checkoutPage.NavigatetoOrders();

    const ordersPage = this.poManager.getOrdersPage();
    const orderPageOrderId = await ordersPage.verifyOrderdetailsinOrderPage(this.orderId);
    console.log(orderPageOrderId);
    await expect(this.orderId.includes(orderPageOrderId)).toBeTruthy();
});
When('Verify all products and print them', async function () {
    const dashboardPage = this.poManager.getdashboardPage();
});

Given('Login to ecommerce2 site with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify error message is showed up', async function () {
    console.log(await this.page.locator("[style*='display']").textContent());
    await expect(this.page.locator("[style*='display']")).toContainText('Incorrect username/password.');
});

//npx cucumber-js features/ErrorValidation.feature --exit
//npx cucumber-js --tags "@Regression" --exit
//cucumber can run scenario in parallel not feature file
//npx cucumber-js features/Ecommerce.feature --parallel 2 --exit to run 2 cases in parallel
//npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js --tage "@Regression" --retry 1 --exit --format html:cucumber-report.html