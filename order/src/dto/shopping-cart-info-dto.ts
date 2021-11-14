import { ShoppingCartItemDTO } from "./shopping-cart-item-dto";

export class ShoppingCartInfoDTO {

    private _items: ShoppingCartItemDTO[]; 
    private _cartID: string;
    private _clientID: string;

    public get cartID(): string {
        return this._cartID;
    }
    public set cartID(value: string) {
        this._cartID = value;
    }
    public get clientID(): string {
        return this._clientID;
    }
    public set clientID(value: string) {
        this._clientID = value;
    }
    public get items(): ShoppingCartItemDTO[] {
        return this._items;
    }
    public set items(value:ShoppingCartItemDTO[]) {
        this._items = value;
    }
}