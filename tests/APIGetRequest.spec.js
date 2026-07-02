const { test, expect, request } = require('@playwright/test');

test('@API GET request returns expected data', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('userId', 1);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.body).toBe('string');
});
