const {expect}= require('@playwright/test')
class CartPage
{
    constructor(page)
    {
        this.page=page;
        this.cartProducts=page.locator("div ul li");
        this.checkout=page.locator("text=Checkout");
        
        
    }
    async verifyProductinCartPresent(productName)
    {
          await this.cartProducts.first().waitFor();
          const prodInCart = await this.page.getByText(productName).isVisible();
          expect(prodInCart).toBeTruthy();    
    }
    async navigatetoCheckout()
    {
        await this.checkout.click();
    }
}
module.exports={CartPage};