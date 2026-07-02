//request for web api testing
const { test, expect, request } = require('@playwright/test')
const loginPayload = { userEmail: "radha21@mymail.com", userPassword: "Abc&xyz123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;
test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:
            {
                'Authorization': token,
                'content-type': 'application/json'
            },
        })
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log(orderResponseJson);

});

test("@API Web API test", async ({ page }) => {
    //to execute javascript.it is passing token to test
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const detailOrderPage = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(orderId.includes(detailOrderPage)).toBeTruthy();



});

