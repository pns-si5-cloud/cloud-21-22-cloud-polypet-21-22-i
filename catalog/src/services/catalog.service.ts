import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonDetailedProduct } from 'src/models/NonDetailedProduct';
import { Product } from 'src/models/Product';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService {
    public constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>){}
        
    public addProductToCatalog(productReq:{name:string,price:number,category:string,description:string,partnerID:string, ingredient:string,dimension:string}){
        var addedProduct = new Product();
        addedProduct.addedDate = new Date();//Date du jour
        addedProduct.category = productReq.category;
        addedProduct.description = productReq.description;
        addedProduct.dimension = productReq.dimension;
        addedProduct.ingredient = productReq.ingredient;
        addedProduct.name = productReq.name;
        addedProduct.partner_id = productReq.partnerID;
        addedProduct.price = +productReq.price;

        this.productRepository.save(addedProduct);
        console.log("new product added to catalog")
    }


    public async getAllNonDetailedProduct():Promise<NonDetailedProduct[]>{
        var productList = await this.productRepository.find();

        var nonDetailedProductList:NonDetailedProduct[] = [];

        for(let product of productList){
            //TODO partner NAME !! (et pas ID)
            var ndProd = new NonDetailedProduct(product.product_id,product.name,product.description);
            nonDetailedProductList.push(ndProd);
        }
        console.log("Get all non detailed product : "+JSON.stringify(nonDetailedProductList));
        return nonDetailedProductList;
    }
}

