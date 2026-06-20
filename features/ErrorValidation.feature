Feature: Ecommerce site validations
@ErrorValidation
Scenario Outline: Validate error message for wrong id and password
Given Login to ecommerce2 site with "<username>" and "<password>"
Then Verify error message is showed up

Examples:
|username           |password   |
|radha21@mymail.com |Abc&xyz123 |
|nandini@mymail.com |Abc&xyz123 |