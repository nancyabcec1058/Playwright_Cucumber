const { expect } = require('@playwright/test')
class OrdersPage {
    constructor(page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.orderIdColumn = page.locator("tbody tr");
        this.orderPageOrderId = page.locator(".col-text");


    }
    async verifyOrderdetailsinOrderPage(orderId) {
        await this.orderTable.waitFor();
        const rows = await this.orderIdColumn;
        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        return await this.orderPageOrderId.textContent();

    }


}
module.exports = { OrdersPage };