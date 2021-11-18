import { CommandItem } from "./command-item";


export class CommandStatus {
    
    public constructor(
        private _items: CommandItem[],
        private _address: string,
        private _status: string,
        private _totalPrice: number,
        private _billingAddress: string, 
        private _paiementDate: Date,
        private _deliveryDate: Date|null,
        )
    {}

    public static fromJSON(JSON:any){
        
        var itemList:CommandItem[] = JSON._items?.map((item:any)=>CommandItem.fromJSON(item));
        var deliveryDate = JSON._deliveryDate? new Date(JSON._deliveryDate) : null;

        var commandStatus = new CommandStatus(itemList,JSON._address,JSON._status,
            +JSON._totalPrice,JSON._billingAddress,new Date(JSON._paiementDate), deliveryDate);

        return commandStatus;
    }

    public get deliveryDate(): Date|null {
        return this._deliveryDate;
    }
    public set deliveryDate(value: Date|null) {
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
    public get items(): CommandItem[] {
        return this._items;
    }
    public set items(value: CommandItem[]) {
        this._items = value;
    }
}