import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product-dto';
import { NonDetailedProduct } from 'src/dto/non-detailed-product-dto';
import { ShoppingCartProduct } from 'src/dto/shopping-cart-product-dto';
import { Between, Repository } from 'typeorm';
import { Product } from 'src/models/product';

@Injectable()
export class CatalogService {
    public constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>){}
        
    public addProductToCatalog(productReq:ProductDTO){
        var addedProduct:Product = Product.createProductFromProductDTO(productReq);
        this.productRepository.save(addedProduct);
        console.log("new product added to catalog : "+JSON.stringify(addedProduct));
    }


    public async getAllNonDetailedProducts():Promise<NonDetailedProduct[]>{
        var productsList:Product[] = await this.productRepository.find();
        var nonDetailedProductsList:NonDetailedProduct[] = [];

        for(let product of productsList){
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

        var lastestProductsList = await this.productRepository.find({
            order: {addedDate:"DESC"}, take:5});

        if(lastestProductsList.length > 5)
            throw new Error("MORE THAN 5 LATEST PRODUCT :"+lastestProductsList);

        console.log("Get latest products : "+JSON.stringify(lastestProductsList));
        return lastestProductsList;
    }

    public async verifyAndReturnCartProduct(productID:string):Promise<ShoppingCartProduct>{
        var product = await this.getDetailedProduct(productID);
        console.log("Verify product and found : "+JSON.stringify(product));

        if(!product) return undefined;

        var shoppingCartProduct = new ShoppingCartProduct(product.product_id,product.name,product.price);
        console.log("Return shopping cart product : "+JSON.stringify(ShoppingCartProduct));
        return shoppingCartProduct;
    }
}

