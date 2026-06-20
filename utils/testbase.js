const base = require('@playwright/test')

exports.customtest = base.test.extend({
    testDataforOrder: {
        username: "radha21@mymail.com",
        password: "Abc&xyz123",
        productName: "ZARA COAT 3"
    }
})