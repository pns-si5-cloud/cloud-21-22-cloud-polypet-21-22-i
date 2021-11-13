import { Injectable } from '@nestjs/common';
import { ProductRequest } from 'src/models/product-request';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Product } from 'src/models/product';

@Injectable()
export class ProductRequestService {
    private URL_CATALOG = environment.catalog.URL_ADD_PRODUCT;

    constructor(
        @InjectRepository(ProductRequest)
        private productRequestRepository: Repository<ProductRequest>,
        private http:HttpService
      ) {}

    async addNewProduct(name: string, price: number, category: string, description: string, partner_id: any, ingredient: string, dimension: string) {
        var product = new Product();

        product.name = name;
        product.price = +price;
        product.category = category;
        product.description = description;
        product.partnerID = partner_id;
        product.ingredient = ingredient;
        product.dimension = dimension;

        this.http.post(this.URL_CATALOG, {product}).subscribe({
            next : (response)=> console.log("Send to Catalog"),
            error : (error)=> console.error(error),
        });
    }

    async validateRequest(id: number) {
        var product = new Product();

        var productRequest = await this.productRequestRepository.findOne(id);
        if (productRequest) {
            product.name = productRequest.name;
            product.price = productRequest.price;
            product.category = productRequest.category;
            product.description = productRequest.description;
            product.partnerID = productRequest.partner_id;
            product.ingredient = productRequest.ingredient;
            product.dimension = productRequest.dimension;

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

    async addNewProductRequest(name: string, price: number, category: string, description: string, partner_id: any, ingredient: string, dimension: string): Promise<number> {
        const productRequest = new ProductRequest();
        productRequest.name = name;
        productRequest.price = price;
        productRequest.category = category;
        productRequest.description = description;
        productRequest.partner_id = partner_id;
        productRequest.ingredient = ingredient;
        productRequest.dimension = dimension;

        await this.productRequestRepository.save(productRequest);
        console.log("Product saved in database.");
        
        return productRequest.id;
    }
}
