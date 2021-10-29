import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonDetailedProduct } from 'src/models/NonDetailedProduct';
import { Product } from 'src/models/Product';
import { ShoppingCartProduct } from 'src/models/ShoppingCartProduct';
import { Between, Repository } from 'typeorm';

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
        console.log("new product added to catalog - : "+JSON.stringify(addedProduct));
    }


    public async getAllNonDetailedProducts():Promise<NonDetailedProduct[]>{
        var productsList = await this.productRepository.find();

        var nonDetailedProductsList:NonDetailedProduct[] = [];

        for(let product of productsList){
            //TODO partner NAME !! (et pas ID)
            var ndProd = new NonDetailedProduct(product.product_id,product.name,product.description);
            nonDetailedProductsList.push(ndProd);
        }
        console.log("Get all non detailed product : "+JSON.stringify(nonDetailedProductsList));
        return nonDetailedProductsList;
    }

    public async getDetailedProduct(productID:string):Promise<Product>{
        var product = await this.productRepository.findOne({where:{product_id:productID}});
        console.log("Get product : "+JSON.stringify(product));
        return product;
    }

    public async getLatestProducts():Promise<Product[]>{

        var now = new Date();
        var tenDaysBefore = new Date();
        tenDaysBefore.setDate(tenDaysBefore.getDate()-10)

        var lastestProductsList = await this.productRepository.find({where:{addedDate:Between(tenDaysBefore,now)}});
        console.log("Get latest products : "+JSON.stringify(lastestProductsList));
        return lastestProductsList;
    }

    public async verifyAndReturnCartProduct(productID:string):Promise<ShoppingCartProduct>{
        var product = await this.productRepository.findOne({where:{product_id:productID}});
        console.log("Verify product and found : "+JSON.stringify(product));

        var shoppingCartProduct = new ShoppingCartProduct(product.product_id,product.name,+product.price);
        console.log("Return shopping cart product : "+JSON.stringify(ShoppingCartProduct));
        return shoppingCartProduct;
    }
}

