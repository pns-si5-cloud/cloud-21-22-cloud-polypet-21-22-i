import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatalogService } from 'src/services/catalog.service';

@Controller('catalog')
export class CatalogController {

    constructor(private catalogService : CatalogService){}


    @Post('add-product')
    addProductToCatalog(@Body("product") product:{name:string,price:number,category:string,description:string,partnerID:string, ingredient:string,dimension:string}){
        console.log("[addProductToCatalog]")
        this.catalogService.addProductToCatalog(product);
    }

    @Get('get-all-product')
    getAllProduct(){
        console.log("[getAllProduct]");
        return this.catalogService.getAllNonDetailedProduct();
    }
}
