import { test, expect } from "@playwright/test";

test.describe("Automation Test Store - katalógus", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://automationteststore.com/");
    });

    test("a Makeup kategória megnyitja a terméklistát", async ({ page }) => {
        await page.getByRole("link", { name: "Makeup", exact: true }).first().click();

        await expect(page).toHaveURL(/path=product\/category&path=36/);
        await expect(page.getByRole("heading", { name: "Makeup" })).toBeVisible();
        await expect(
            page.getByRole("link", { name: "Skinsheen Bronzer Stick" }),
        ).toBeVisible();
    });

    test("a keresés a megadott termék találatait jeleníti meg", async ({ page }) => {
        const searchInput = page.getByPlaceholder("Search Keywords");
        await searchInput.fill("Skinsheen Bronzer Stick");
        await searchInput.press("Enter");

        await expect(page).toHaveURL(/route=product\/search/);
        await expect(
            page.getByRole("link", { name: "Skinsheen Bronzer Stick" }),
        ).toBeVisible();
    });

    test("a kosár ikon megnyitja az üres kosarat", async ({ page }) => {
        await page.getByRole("link", { name: /shopping cart/i }).click();

        await expect(page).toHaveURL(/checkout\/cart/);
        await expect(page.locator("#cart")).toContainText(/empty|no products/i);
    });
});
