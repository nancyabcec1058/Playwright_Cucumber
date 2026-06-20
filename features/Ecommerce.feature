Feature: Ecommerce site validations
@Regression
Scenario: Place order
Given Login to ecommerce site with "radha21@mymail.com" and "Abc&xyz123"
When Add "ZARA COAT 3" to cart
Then Verify "ZARA COAT 3" is displayed in cart
When Enter details in checkout verify "radha21@mymail.com" and place order
Then Verify order is present in order history page

@Regression
Scenario: Verify products on ecommerce site
Given Login to ecommerce site with "radha21@mymail.com" and "Abc&xyz123"
When Verify all products and print them
