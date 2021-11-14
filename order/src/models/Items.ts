import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Delivery } from "./Delivery";

@Entity()
export class Items {

    @ManyToOne(()=>Delivery,(deliver)=>deliver.items)
    delivery:Delivery

    @PrimaryColumn({name:"product_id"})
    productID: string;

    @Column({name:"quantity"})
    quantity: number;

    @Column({name:"product_name"})
    productName: string;

    @Column({type:"double precision",name:"product_price"})
    productPrice: number;
}