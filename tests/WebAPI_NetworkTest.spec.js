//request for web api testing
//trace.playwright.dev to view trace results
const { test, expect, request } = require('@playwright/test')
const loginPayload = { userEmail: "radha21@mymail.com", userPassword: "Abc&xyz123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const{APIUtils}=require('../utils/APIUtils');
const fakePayloadResponse={data:[],message:"No Orders"};
let response;
test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const apiUtils =new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);

});

test("Web API Network test", async ({ page }) => {
    
    //to execute javascript.it is passing token to test
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client");
    //* means accept any user id
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
      //intercepting response-api response-playwright fake response->send to browser
      // fake response to get no order response from orders page though orders exist but to test this scenario
      const response=await page.request.fetch(route.request());
      let body=JSON.stringify(fakePayloadResponse);
      route.fulfill(
        {
           response,
           body,
        }
      )
    })
    
    await page.locator("button[routerlink*='myorders']").click();
    //await page.pause();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    



});
