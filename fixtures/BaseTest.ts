import { test as playwrightTest, expect } from "@playwright/test";

export const test = playwrightTest.extend({
    // Start each test from the store homepage.
    page: async ({ page }, use) => {
        await page.goto("https://automationteststore.com/");
        await use(page);
    },
});

test.afterEach(async ({ context }) => {
    await context.close();
});

export { expect };
