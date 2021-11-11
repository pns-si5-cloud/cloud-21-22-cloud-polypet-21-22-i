export class ShoppingCartProduct {

    public constructor(productID:string, productName:string, productPrice:number){
        this.productID = productID;
        this.productName = productName;
        this.productPrice = productPrice;
    }

    public productID:string;
    public productName:string;
    public productPrice:number;
}