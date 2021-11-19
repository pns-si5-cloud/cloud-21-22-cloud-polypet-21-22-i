import { Delivery } from "src/models/Delivery";
import { Items } from "src/models/Items";
import { ItemDTO } from "./item-dto";


export class CommandStatusDTO {
    
    public constructor(
        private _items: ItemDTO[],
        private _address: string,
        private _status: string,
        private _totalPrice: number,
        private _billingAddress: string, 
        private _paiementDate: Date,
        private _deliveryDate: Date,
        )
    {}

    public static createCommandStatusDTOFromDelivery(delivery:Delivery,items:Items[]):CommandStatusDTO{
        if(!delivery) return undefined;
        console.log("delivery.items :"+ items)
        var listItemDTO:ItemDTO[] = [];
        for(let item of items){
            listItemDTO.push(ItemDTO.createItemDTOFromItems(item));
        }

        var commandStatusDTO = new CommandStatusDTO(
            listItemDTO,
            delivery.address,
            delivery.status,
            delivery.totalPrice,
            delivery.billingAddress,
            delivery.paiementDate,
            delivery.deliveryDate
        );

        return commandStatusDTO;
    }

    public get deliveryDate(): Date {
        return this._deliveryDate;
    }
    public set deliveryDate(value: Date) {
        this._deliveryDate = value;
    }
    public get paiementDate(): Date {
        return this._paiementDate;
    }
    public set paiementDate(value: Date) {
        this._paiementDate = value;
    }
    public get billingAddress(): string {
        return this._billingAddress;
    }
    public set billingAddress(value: string) {
        this._billingAddress = value;
    }
    public get totalPrice(): number {
        return this._totalPrice;
    }
    public set totalPrice(value: number) {
        this._totalPrice = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    public get items(): ItemDTO[] {
        return this._items;
    }
    public set items(value: ItemDTO[]) {
        this._items = value;
    }
}