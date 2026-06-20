
const { test, expect, request } = require('@playwright/test')


test("Web API Network security test", async ({ page }) => {
    const email = "radha21@mymail.com";
    const productName = "ZARA COAT 3";
    const products = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Abc&xyz123");
    await page.locator("[value='Login']").click();
    //wait for network call and it is in idle state .network calls all product and page details
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").last().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a2d184e17fe3e78bad83bfc" }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});