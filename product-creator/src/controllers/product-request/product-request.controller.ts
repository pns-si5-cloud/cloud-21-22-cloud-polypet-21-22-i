import { Body, Controller, Post } from '@nestjs/common';
import { ProductRequestService } from 'src/services/product-request/product-request.service';

@Controller('product-request')
export class ProductRequestController {

    constructor(private productRequestService: ProductRequestService) {}

    @Post('add-new-product')
    addNewProduct(@Body('name') name:string, 
    @Body('price') price:number,
    @Body('category') category:string,
    @Body('description') description:string,
    @Body('partner_id') partner_id:string,
    @Body('ingredient') ingredient:string,
    @Body('dimension') dimension:string) {
        console.log("New product added by Polypet.");

        return this.productRequestService.addNewProduct(name, price, category, description, partner_id, ingredient, dimension);
    }

    @Post('validate-request')
    validateRequest(@Body('request_id') id:number) {
        console.log("Product number " + id + " validated by Polypet.");

        return this.productRequestService.validateRequest(id);
    }

    @Post('add-new-product-request')
    addNewProductRequest(@Body('name') name:string, 
    @Body('price') price:number,
    @Body('category') category:string,
    @Body('description') description:string,
    @Body('partner_id') partner_id:string,
    @Body('ingredient') ingredient:string,
    @Body('dimension') dimension:string): Promise<number> {
        console.log("New product request.");

        return this.productRequestService.addNewProductRequest(name, price, category, description, partner_id, ingredient, dimension);
    }

}
