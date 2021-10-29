import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne} from "typeorm";

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

}
