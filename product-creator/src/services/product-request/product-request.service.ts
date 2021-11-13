import { Injectable } from '@nestjs/common';
import { ProductRequest } from 'src/models/product-request';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ProductRequestDTO } from 'src/dto/product-request-dto';
import { environment } from 'src/environment';

@Injectable()
export class ProductRequestService {
    private URL_CATALOG = environment.catalog.URL_ADD_PRODUCT;

    constructor(
        @InjectRepository(ProductRequest)
        private productRequestRepository: Repository<ProductRequest>,
        private http:HttpService
      ) {}

    async addNewProduct(product: ProductRequestDTO) {

        this.http.post(this.URL_CATALOG, {product}).subscribe({
            next : (response)=> console.log("Send to Catalog"),
            error : (error)=> console.error(error),
        });
    }

    async validateRequest(id: number) {
        var productRequest = await this.productRequestRepository.findOne(id);
        var product: ProductRequestDTO = ProductRequestDTO.createProductRequestDTOFromProductRequest(productRequest);
        
        if (productRequest) {

            this.http.post(this.URL_CATALOG, {product}).subscribe({
                next : (response) => console.log("Send to catalog"),
                error : (error) => console.error(error),
            })

            await this.productRequestRepository.remove(productRequest);
            console.log("Product sent to Catalog and deleted from database.");
        }
        else {
            throw new Error('Product ID invalid or doesn\'t exist');
        }
    }

    async addNewProductRequest(productReq: ProductRequestDTO): Promise<number> {
        var productRequest:ProductRequest = ProductRequest.createProductRequestFromProductRequestDTO(productReq);

        await this.productRequestRepository.save(productRequest);
        console.log("Product saved in database under id " + productRequest.id + ".");
        
        return productRequest.id;
    }
}
