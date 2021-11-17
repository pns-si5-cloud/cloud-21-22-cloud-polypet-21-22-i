import {ShoppingCartItem} from "./shopping-cart-item";

export class ShoppingCart {

  private _items: ShoppingCartItem[];

  public constructor(
    private _cartID: string,
    private _clientID: string,
    private _totalPrice: number,
  ) {
    this._items = [];
  }

  public static fromJSON(json: any) {
    const cart =  new this(
      json.cartID,
      json.clientID,
      json.totalPrice,
    )
    json.items.forEach((item:{item: { productID: string; quantity: number; price: number; productName: string }}) => cart.items.push(ShoppingCartItem.fromJSON(item)));
    return cart;

  }

  get items(): ShoppingCartItem[] {
    return this._items;
  }

  get cartID(): string {
    return this._cartID;
  }

  get clientID(): string {
    return this._clientID;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set cartID(value: string) {
    this._cartID = value;
  }

  set clientID(value: string) {
    this._clientID = value;
  }

  set totalPrice(value: number) {
    this._totalPrice = value;
  }
}
