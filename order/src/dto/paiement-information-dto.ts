export class PaiementInformationDTO {
    private _account: string;
    private _bankCardID: string; 
    private _address: string;
    private _shoppingCartID: string;
    private _billingAddress: string;

    public constructor(
        account:string,
        bankCardID:string,
        address:string,
        shoppingCartID:string,
        billingAddress:string){
        
            this._account = account;
            this._bankCardID = bankCardID;
            this._address = address;
            this._shoppingCartID = shoppingCartID;
            this._billingAddress = billingAddress;
    }

    public get shoppingCartID(): string {
        return this._shoppingCartID;
    }
    public set shoppingCartID(value: string) {
        this._shoppingCartID = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    public get billingAddress(): string {
        return this._billingAddress;
    }
    public set billingAddress(value: string) {
        this._billingAddress = value;
    }
    public get account(): string {
        return this._account;
    }
    public set account(value: string) {
        this._account = value;
    }
    public get bankCardID(): string {
        return this._bankCardID;
    }
    public set bankCardID(value: string) {
        this._bankCardID = value;
    }
}
