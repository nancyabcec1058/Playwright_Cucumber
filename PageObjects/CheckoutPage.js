const { expect } = require('@playwright/test')
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.countryDrpdwn = page.locator(".ta-results");
        this.countrydrpdwnOptions = this.countryDrpdwn.locator("button");
        this.expiryMonth = page.locator(".ddl");
        this.mymail = page.locator("div label");
        this.submitOrder = page.locator(".action__submit");
        this.orderPlacedText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderPage = page.locator("[routerlink='/dashboard/myorders']");

    }
    async fillCheckoutPageandSubmitOrder(entercountry, country, expiryMonth, username) {
        await this.selectCountry.pressSequentially(entercountry, { delay: 150 });
        await this.countryDrpdwn.waitFor();
        const options = await this.countrydrpdwnOptions.count();
        for (let i = 0; i < options; i++) {
            const text = await this.countrydrpdwnOptions.nth(i).textContent();
            if (await text.trim() === country) {
                await this.countrydrpdwnOptions.nth(i).click();
                break;
            }
        }
        await this.expiryMonth.first().selectOption(expiryMonth);
        await expect(this.mymail).toHaveText(username);
        await this.submitOrder.click();
    }
    async getOrderIdDetails() {
        await expect(this.orderPlacedText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();

    }
    async NavigatetoOrders() {
        await this.orderPage.first().click();
    }
}
module.exports = { CheckoutPage };