import { ProductRequest } from "src/models/product-request";

export class ProductRequestDTO {

    public constructor(
        private _name: string,
        private _price: number,
        private _category: string,
        private _description: string,
        private _partnerID: string, 
        private _ingredient: string,
        private _dimension: string
        )
    {}

    public static createProductRequestDTOFromProductRequest(productRequest:ProductRequest) : ProductRequestDTO{
        if(!productRequest) return undefined;

        var productRequestDTO = new ProductRequestDTO(
            productRequest.name,
            productRequest.price,
            productRequest.category,
            productRequest.description,
            productRequest.partner_id,
            productRequest.ingredient,
            productRequest.dimension
            );

        return productRequestDTO;
    }

    public toJSON() {
        return {
            name:this.name,
            price:this.price,
            category:this.category,
            description:this.description,
            partnerID:this.partnerID,
            ingredient:this.ingredient,
            dimension:this.dimension
        }
    }

    public get dimension(): string {
        return this._dimension;
    }
    public set dimension(value: string) {
        this._dimension = value;
    }
    public get ingredient(): string {
        return this._ingredient;
    }
    public set ingredient(value: string) {
        this._ingredient = value;
    }
    public get partnerID(): string {
        return this._partnerID;
    }
    public set partnerID(value: string) {
        this._partnerID = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get category(): string {
        return this._category;
    }
    public set category(value: string) {
        this._category = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}