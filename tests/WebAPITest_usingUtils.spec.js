//request for web api testing
//trace.playwright.dev to view trace results
const { test, expect, request } = require('@playwright/test')
const loginPayload = { userEmail: "radha21@mymail.com", userPassword: "Abc&xyz123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const { APIUtils } = require('../utils/APIUtils');
let response;
test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test("@API Web API test", async ({ page }) => {

    //to execute javascript.it is passing token to test
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const detailOrderPage = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(detailOrderPage)).toBeTruthy();



});
