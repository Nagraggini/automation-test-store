import { test, expect } from "../fixtures/BaseTest";
import * as XLSX from "xlsx";
import path from "node:path";
import { ExcelReader } from "../utils/ExcelReader";

test.describe("Excel munkafüzetes katalógusteszt", () => {
    test("Excelből olvas kereséseket, majd Excelbe menti az eredményeket", async ({
        page,
    }, testInfo) => {
        const outputFile = testInfo.outputPath("keresesi-eredmenyek.xlsx");
        const inputFile = path.join(
            __dirname,
            "..",
            "data",
            "product-searches.xlsx",
        );
        const searchCases = ExcelReader.readProductSearchCases(
            inputFile,
            "Product Searches",
        );
        const results: string[][] = [["Search", "Expected Product", "Result"]];

        await page.goto("https://automationteststore.com/");
        for (const searchCase of searchCases) {
            await page
                .getByPlaceholder("Search Keywords")
                .fill(searchCase.searchTerm);
            await page.getByPlaceholder("Search Keywords").press("Enter");
            const product = page.getByRole("link", {
                name: searchCase.expectedProductName,
                exact: true,
            });
            await expect(product).toBeVisible();
            results.push([
                searchCase.searchTerm,
                searchCase.expectedProductName,
                "Passed",
            ]);
        }

        const outputBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            outputBook,
            XLSX.utils.aoa_to_sheet(results),
            "Results",
        );
        XLSX.writeFile(outputBook, outputFile);
        const savedRows = XLSX.utils.sheet_to_json<string[]>(
            XLSX.readFile(outputFile).Sheets.Results,
            { header: 1 },
        );
        expect(savedRows).toEqual(results);
    });
});
