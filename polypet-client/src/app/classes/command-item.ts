
export class CommandItem {

    public constructor(
        private _name: string,
        private _quantity: number,
        private _unitaryPrice: number,
        )
    {}

    public static fromJSON(JSON:any){
        var commandItem = new CommandItem(JSON._name,+JSON._quantity,+JSON._unitaryPrice);
        return commandItem;
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