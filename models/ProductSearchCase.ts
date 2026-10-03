/** A search scenario loaded from the catalog test workbook. */
export class ProductSearchCase {
    constructor(
        public readonly searchTerm: string,
        public readonly expectedProductName: string,
    ) {}
}
