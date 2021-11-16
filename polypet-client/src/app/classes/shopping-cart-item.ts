export class ShoppingCartItem {
  public constructor(
    private _productID: string,
    private _quantity: number,
    private _price: number,
  ) {}

  public static fromJSON(json: any) {
    return new this(
      json.item.productID,
      json.item.quantity,
      json.item.price,
      )
  }

  get productID(): string {
    return this._productID;
  }

  set productID(value: string) {
    this._productID = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

}
