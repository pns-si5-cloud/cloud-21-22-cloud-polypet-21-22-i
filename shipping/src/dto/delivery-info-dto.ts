import { Delivery } from "src/models/Delivery";
import { ItemDTO } from "./item-dto";


export class DeliveryInfoDTO {
    
    public constructor(
        private _items: ItemDTO[],
        private _address: string,
        private _totalPrice: number,
        private _paiementDate: Date,
        )
    {}

    public static createDeliveryInfoDTOFromDelivery(delivery:Delivery):DeliveryInfoDTO{
        if(!delivery) return undefined;

        var listItemDTO:ItemDTO[] = [];
        for(let item of delivery.items){
            listItemDTO.push(ItemDTO.createItemDTOFromItems(item));
        }

        var deliveryInfoDTO = new DeliveryInfoDTO(
            listItemDTO,
            delivery.address,
            delivery.totalPrice,
            delivery.paiementDate
        );

        return deliveryInfoDTO;
    }

    public get paiementDate(): Date {
        return this._paiementDate;
    }
    public set paiementDate(value: Date) {
        this._paiementDate = value;
    }
    public get totalPrice(): number {
        return this._totalPrice;
    }
    public set totalPrice(value: number) {
        this._totalPrice = value;
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