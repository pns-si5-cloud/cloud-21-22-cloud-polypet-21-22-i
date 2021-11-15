import { CommandItem } from "./command-item";

export class DeliveryInfo {
    
    public constructor(
        private _items: CommandItem[],
        private _address: string,
        private _totalPrice: number,
        private _paiementDate: Date,
        )
    {}

    public static fromJSON(JSON:any){
        
        var itemList:CommandItem[] = JSON._items?.map((item:any)=>CommandItem.fromJSON(item));

        var commandStatus = new DeliveryInfo(itemList,JSON._address,
            +JSON._totalPrice,new Date(JSON._paiementDate));

        return commandStatus;
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
    public get items(): CommandItem[] {
        return this._items;
    }
    public set items(value: CommandItem[]) {
        this._items = value;
    }
}