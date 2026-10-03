import { test, expect } from "@playwright/test";

test.describe("Automation Test Store - E2E Vásárlási Folyamat", () => {
    test("Termék keresése, kosárba helyezése és kosár ellenőrzése", async ({
        page,
    }) => {
        // 1. Nyissuk meg a főoldalt
        await page.goto("https://automationteststore.com/");

        // Oldalcím ellenőrzése
        await expect(page).toHaveTitle(
            /A place to practice your automation skills!/,
        );

        // 2. Keresés indítása
        const searchInput = page.getByPlaceholder("Search Keywords");
        await searchInput.fill("Makeup");
        await searchInput.press("Enter");

        // 3. Első termék kiválasztása a találati listából (Playwright role locator)
        const firstProduct = page.getByRole("link", {
            name: "L'EXTRÊME Instant Extensions Lengthening Mascara",
        });
        await expect(firstProduct).toBeVisible();

        const productName = (await firstProduct.textContent())?.trim();

        // Kattintás a termékre
        await firstProduct.click();

        // 4. Kosárba helyezés a termékoldalon
        const addToCartBtn = page.locator("a.cart");
        await addToCartBtn.click();

        // 5. Ellenőrizzük, hogy a kosár oldalra navigáltunk-e
        await expect(page).toHaveURL(/.*checkout\/cart/);

        // 6. Ellenőrizzük, hogy a termék neve megtalálható-e a kosárban
        if (productName) {
            const cartTable = page.locator("#cart");
            await expect(cartTable).toContainText(productName);
        }
    });
});
