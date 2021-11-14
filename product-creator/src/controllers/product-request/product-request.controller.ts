import { Body, Controller, Post } from '@nestjs/common';
import { ProductRequestDTO } from 'src/dto/product-request-dto';
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

}
