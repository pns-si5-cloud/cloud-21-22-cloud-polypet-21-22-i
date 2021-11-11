export class NonDetailedProduct {

    public constructor(productID:string, productName:string, productDescription:string){
        this.productID = productID;
        this.productName = productName;
        this.productDescription = productDescription;
    }

    public productID:string;
    public productName:string;
    public productDescription:string;
}
