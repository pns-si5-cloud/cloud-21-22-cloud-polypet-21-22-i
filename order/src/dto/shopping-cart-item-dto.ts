export class ShoppingCartItemDTO {
    private _productID: string;
    private _quantity: number;

    public get productID(): string {
        return this._productID;
    }
    public set productID(value: string) {
        this._productID = value;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
}