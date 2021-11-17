export class ShoppingCartItem {
  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  }
  public constructor(
    private _productID: string,
    private _quantity: number,
    private _price: number,
    private _productName: string,
  ) {}

  public static fromJSON(json: any) {
    return new this(
      json.item.productID,
      json.item.quantity,
      json.item.price,
      json.item.productName,
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
