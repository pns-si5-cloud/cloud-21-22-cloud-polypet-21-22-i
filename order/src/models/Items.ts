import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Delivery } from "./Delivery";

@Entity()
export class Items {

    @ManyToOne(()=>Delivery)
    delivery:Delivery
    
    @PrimaryColumn({name:"product_id"})
    ProductID: number;

    @Column({name:"quantity"})
    Quantity: number;

    @Column({name:"product_name"})
    ProductName: number;

    @Column({name:"product_price"})
    ProductPrice: number;
}