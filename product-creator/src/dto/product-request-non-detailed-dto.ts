export class ProductRequestNonDetailed {

    public constructor(productRequestID:number, productName:string, partnerID:string){
        this.productRequestID = productRequestID;
        this.productName = productName;
        this.partnerID = partnerID;
    }

    public productRequestID:number;
    public productName:string;
    public partnerID:string;
}
