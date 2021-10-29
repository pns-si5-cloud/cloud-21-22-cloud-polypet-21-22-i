import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Items {

    @PrimaryColumn({name:"product_id"})
    ProductID: number;

    @Column({name:"quantity"})
    Quantity: number;

    @Column({name:"product_name"})
    ProductName: number;

    @Column({name:"product_price"})
    ProductPrice: number;
}