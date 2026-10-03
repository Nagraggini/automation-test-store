import { test, expect } from "../fixtures/BaseTest";

test.describe("Automation Test Store - katalógus", () => {
    test("a Makeup kategória megnyitja a terméklistát", async ({ page }) => {
        await page
            .getByRole("link", { name: "Makeup", exact: true })
            .first()
            .click();

        await expect(page).toHaveURL(/.*category&path=36/);
        await expect(
            page.getByRole("heading", { name: "Makeup" }),
        ).toBeVisible();
        await expect(
            page.locator(
                '//a[normalize-space()="L\'EXTRÊME Instant Extensions Lengthening Mascara"]',
            ),
        ).toBeVisible();
    });

    test("a keresés a megadott termék találatait jeleníti meg", async ({
        page,
    }) => {
        const searchInput = page.getByPlaceholder("Search Keywords");
        await searchInput.fill("Skinsheen Bronzer Stick");
        await searchInput.press("Enter");

        await expect(page).toHaveURL(/.*product_id=50/);
        await expect(
            page.getByRole("link", { name: "Skinsheen Bronzer Stick" }),
        ).toBeVisible();
    });

    test("a kosár ikon megnyitja az üres kosarat", async ({ page }) => {
        await page
            .locator("(//i[@class='fa fa-shopping-cart fa-fw'])[1]")
            .click();

        await expect(page).toHaveURL(/checkout\/cart/);
        await expect(
            page.locator("//div[@class='contentpanel']"),
        ).toBeVisible();

        await expect(
            page.locator("//div[@class='contentpanel']"),
        ).toContainText("Your shopping cart is empty!");
    });
});
