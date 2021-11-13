import { ProductDTO } from "src/dto/product-dto";
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("catalog_product")
export class Product {

    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    partner_id: string;

    @Column()
    addedDate: Date;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column()
    dimension: string;

    @Column()
    ingredient: string;

    public static createProductFromProductDTO(productDTO:ProductDTO):Product{
        var product = new Product();
        product.addedDate = new Date();//Date du jour
        product.category = productDTO.category;
        product.description = productDTO.description;
        product.dimension = productDTO.dimension;
        product.ingredient = productDTO.ingredient;
        product.name = productDTO.name;
        product.partner_id = productDTO.partnerID;
        product.price = productDTO.price;

        return product;
    }

}
