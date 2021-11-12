import { Items } from "src/models/Items";

export class ItemDTO {

    public constructor(
        private _name: string,
        private _quantity: number,
        private _unitaryPrice: number,
        )
    {}

    public static createItemDTOFromItems(item:Items):ItemDTO{
        if(!item) return undefined;

        var itemDTO = new ItemDTO(item.productName,item.quantity,item.productPrice);

        return itemDTO;
    }

    public get unitaryPrice(): number {
        return this._unitaryPrice;
    }
    public set unitaryPrice(value: number) {
        this._unitaryPrice = value;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}