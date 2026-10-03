import * as XLSX from "xlsx";
import { ProductSearchCase } from "../models/ProductSearchCase";

export class ExcelReader {
    static readProductSearchCases(
        filePath: string,
        sheetName: string,
    ): ProductSearchCase[] {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Worksheet "${sheetName}" was not found in ${filePath}.`);
        }

        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
            defval: "",
            raw: false,
        });
        return rows.flatMap((row, index) => {
            const searchTerm = String(row.Search ?? "").trim();
            const expectedProductName = String(row["Expected Product"] ?? "").trim();

            if (!searchTerm && !expectedProductName) return [];
            if (!searchTerm || !expectedProductName) {
                throw new Error(`Incomplete search data on row ${index + 2} of ${filePath}.`);
            }

            return [new ProductSearchCase(searchTerm, expectedProductName)];
        });
    }
}
