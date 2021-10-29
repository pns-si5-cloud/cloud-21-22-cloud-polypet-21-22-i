import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CatalogService } from 'src/services/catalog.service';

@Controller('catalog')
export class CatalogController {

    constructor(private catalogService : CatalogService){}


    @Post('add-product')
    addProductToCatalog(@Body("product") product:{name:string,price:number,category:string,description:string,partnerID:string, ingredient:string,dimension:string}){
        console.log("[addProductToCatalog]")
        this.catalogService.addProductToCatalog(product);
    }

    @Get('get-all-products')
    getAllProducts(){
        console.log("[getAllProduct]");
        return this.catalogService.getAllNonDetailedProducts();
    }

    @Get('get-detailed-product')
    getDetailedProduct(@Query('productID') productID:string){
        console.log("[getDetailedProduct]");
        return this.catalogService.getDetailedProduct(productID);
    }

    @Get('get-latest-products')
    getLatestProducts(){
        console.log("[getLategetLatestProductsstProduct]");
        return this.catalogService.getLatestProducts();
    }

    @Get('verify-product')
    verifyAndReturnCartProduct(@Query('productID') productID:string){
        console.log("[verifyAndReturnCartProduct]");
        return this.catalogService.verifyAndReturnCartProduct(productID);
    }
}
