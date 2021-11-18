export class PaiementInformationDTO {
    private _account: string;
    private _bankCardID: string; 
    private _address: string;
    private _shoppingCartID: string;
    private _clientID: string;
    private _billingAddress: string;

    public constructor(
        acount:string,
        bankCardID:string,
        address:string,
        shoppingCartID:string,
        clientID:string,
        billingAddress:string){
        
            this._account = acount;
            this._bankCardID = bankCardID;
            this._address = address;
            this._shoppingCartID = shoppingCartID;
            this._clientID = clientID;
            this._billingAddress = billingAddress;
    }

    public get shoppingCartID(): string {
        return this._shoppingCartID;
    }
    public set shoppingCartID(value: string) {
        this._shoppingCartID = value;
    }
    public get clientID(): string {
        return this._clientID;
    }
    public set clientID(value: string) {
        this._clientID = value;
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
    public static fromJSON(json:any) {
        return new this(
        json.account,
          json.bankCardID,
          json.address,
          json.shoppingCartID,
          json.clientID,
          json.billingAddress)
      }
}
