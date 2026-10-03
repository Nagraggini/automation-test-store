import { test, expect } from "@playwright/test";

const categories = ["Skincare", "Fragrance", "Haircare", "Men"];

for (const category of categories) {
    test(`${category} kategória megnyílik`, async ({ page }) => {
        await page.goto("https://automationteststore.com/");
        await page.getByRole("link", { name: category, exact: true }).first().click();

        await expect(page).toHaveURL(/path=product\/category/);
        await expect(page.getByRole("heading", { name: category, exact: true })).toBeVisible();
    });
}

test("a termék adatlapján látható a megnevezés és a kosárba helyezés", async ({ page }) => {
    await page.goto("https://automationteststore.com/");
    await page.getByPlaceholder("Search Keywords").fill("Skinsheen Bronzer Stick");
    await page.getByPlaceholder("Search Keywords").press("Enter");
    await page.getByRole("link", { name: "Skinsheen Bronzer Stick", exact: true }).click();

    await expect(page.getByRole("heading", { name: "Skinsheen Bronzer Stick" })).toBeVisible();
    await expect(page.locator("a.cart")).toBeVisible();
});
