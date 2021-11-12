import { Items } from "src/models/Items";

export class DeliveryDateDTO {

    public constructor(
        private _deliveryID: string,
        private _deliveryDate: Date,
        )
    {}

    public get deliveryDate(): Date {
        return this._deliveryDate;
    }
    public set deliveryDate(value: Date) {
        this._deliveryDate = value;
    }
    public get deliveryID(): string {
        return this._deliveryID;
    }
    public set deliveryID(value: string) {
        this._deliveryID = value;
    }

}