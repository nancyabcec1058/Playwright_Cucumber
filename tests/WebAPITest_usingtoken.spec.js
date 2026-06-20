//instead of entering token again and again we can login once from ui and use that file to open browser helpful in case multiple session attributes or test cases
//playwright inspector will work only to debug UI not API.to debug api and ui,in package.json use filename and open debug npm script

const { test, expect } = require('@playwright/test')
let webContext;
const email = "radha21@mymail.com";
test.beforeAll(async ({ browser }) => {
   //Login UI
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Abc&xyz123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState("networkidle");
   await context.storageState({ path: 'state.json' });
   //invoke browser by injecting this json file
   webContext = await browser.newContext({ storageState: 'state.json' });

});

test("@API browser playwright test", async ({ }) => {

   const productName = "ZARA COAT 3";

   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = await page.locator(".card-body");
   await page.locator(".card-body b").last().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; i++) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div ul li").last().waitFor();
   const prodInCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(prodInCart).toBeTruthy();
   await page.locator("text=Checkout").click();
   //pressSequentially to enter character one by one
   await page.locator("[placeholder='Select Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const options = await dropdown.locator("button").count();
   for (let i = 0; i < options; i++) {
      if (await dropdown.locator("button").nth(i).textContent() === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   //await page.pause();
   const expirydrpdwn = await page.locator(".ddl").first().selectOption("10");

   //.user__name [type='text']
   await expect(page.locator("div label")).toHaveText(email);
   await page.locator(".action__submit").click();

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
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
   expect(orderId.includes(detailOrderPage)).toBeTruthy();

});
