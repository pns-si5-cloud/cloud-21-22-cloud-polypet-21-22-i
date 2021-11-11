import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product-dto';
import { Product } from 'src/models/product';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
import { ParseProductDtoPipe } from 'src/pipe/parse-product-dto.pipe';
import { CatalogService } from 'src/services/catalog.service';

@Controller('catalog')
export class CatalogController {

    constructor(private catalogService : CatalogService){}


    @Post('add-product')
    addProductToCatalog(@Body("product", ParseProductDtoPipe) product:ProductDTO){
        console.log("[addProductToCatalog]")
        this.catalogService.addProductToCatalog(product);
    }

    @Get('get-all-products')
    getAllProducts(){
        console.log("[getAllProduct]");
        return this.catalogService.getAllNonDetailedProducts();
    }

    @Get('get-detailed-product')
    async getDetailedProduct(@Query('productID',ParseNotNullPipe) productID:string){
        console.log("[getDetailedProduct]");
        var product:Product = await this.catalogService.getDetailedProduct(productID);
        var productDTO = ProductDTO.createProductDTOFromProduct(product);

        console.log("return product dto : "+JSON.stringify(productDTO));
        return productDTO
    }

    @Get('get-latest-products')
    async getLatestProducts(){
        console.log("[getLategetLatestProductsstProduct]");
        var productList:Product[] = await this.catalogService.getLatestProducts();
        var productDTOList = []

        for(let product of productList){
            var productDTO = ProductDTO.createProductDTOFromProduct(product);
            productDTOList.push(productDTO);
        }
        console.log("return product dto list : "+JSON.stringify(productDTOList));
        return productDTOList;
    }

    @Get('verify-product')
    verifyAndReturnCartProduct(@Query('productID',ParseNotNullPipe) productID:string){
        console.log("[verifyAndReturnCartProduct]");
        return this.catalogService.verifyAndReturnCartProduct(productID);
    }
}
