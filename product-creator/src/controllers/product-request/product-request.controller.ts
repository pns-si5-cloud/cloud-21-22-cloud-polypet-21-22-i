import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductRequestDTO } from 'src/dto/product-request-dto';
import { ProductRequestNonDetailed } from 'src/dto/product-request-non-detailed-dto';
import { ProductRequest } from 'src/models/product-request';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
import { ParseProductRequestDtoPipe } from 'src/pipe/parse-product-request-dto.pipe';
import { ProductRequestService } from 'src/services/product-request/product-request.service';

@Controller('product-request')
export class ProductRequestController {

    constructor(private productRequestService: ProductRequestService) {}

    @Post('add-new-product')
    addNewProduct(@Body("new-product", ParseProductRequestDtoPipe) productRequest:ProductRequestDTO) {
        console.log("[addNewProduct] " + JSON.stringify(productRequest));

        return this.productRequestService.addNewProduct(productRequest);
    }

    @Post('validate-request')
    validateRequest(@Body('request_id', ParseNotNullPipe) id:number) {
        console.log("[validateRequest] " + id);

        return this.productRequestService.validateRequest(id);
    }

    @Post('add-new-product-request')
    addNewProductRequest(@Body('new-product-request', ParseProductRequestDtoPipe) productRequest:ProductRequestDTO) : Promise<number> {
        console.log("[addNewProductRequest] " + JSON.stringify(productRequest));

        return this.productRequestService.addNewProductRequest(productRequest);
    }

    @Get('all-product-requests')
    retrieveAllProductRequests() : Promise<ProductRequestNonDetailed[]> {
        console.log("[retrieveAllProductRequests]");

        return this.productRequestService.retrieveAllProductRequests();
    }

    @Get('get-detailed-product-request')
    retrieveProductRequestDetailed(@Query('productID', ParseNotNullPipe) productID:number) : Promise<ProductRequestDTO> {
        console.log("[retrieveProductRequestDetailed] product ID : " + productID);

        return this.productRequestService.retrieveDetailedProductRequest(productID);
    }

    @Post('delete-product-request')
    deleteProductRequest(@Body('request_id', ParseNotNullPipe) id:number) {
        console.log("[deleteProductRequest] " + id);

        return this.productRequestService.deleteProductRequest(id);
    }

}
