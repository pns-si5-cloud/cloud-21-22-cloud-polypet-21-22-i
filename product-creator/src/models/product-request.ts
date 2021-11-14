import { ProductRequestDTO } from "src/dto/product-request-dto";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ProductRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type:"double precision", 
        unsigned:true
    })
    price: number;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column()
    partner_id: string;

    @Column()
    ingredient: string;

    @Column()
    dimension: string;

    public static createProductRequestFromProductRequestDTO(productRequestDTO:ProductRequestDTO) : ProductRequest{
        var productRequest = new ProductRequest();
        productRequest.category = productRequestDTO.category;
        productRequest.description = productRequestDTO.description;
        productRequest.dimension = productRequestDTO.dimension;
        productRequest.ingredient = productRequestDTO.ingredient;
        productRequest.name = productRequestDTO.name;
        productRequest.partner_id = productRequestDTO.partnerID;
        productRequest.price = productRequestDTO.price;

        return productRequest;
    }
}

