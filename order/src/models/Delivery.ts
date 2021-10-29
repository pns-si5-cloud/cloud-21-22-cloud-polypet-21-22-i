import {Entity, Column, PrimaryColumn} from "typeorm";
import { Items } from "./Items";
import { OneToMany,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Delivery {

    @PrimaryGeneratedColumn()
    temporaryId:number

    @OneToMany(type => Items, items => items.ProductID)
    items: Items[];

    @PrimaryColumn({name:"delivery_id"})
    DeliveryID: string;

    @Column({name:"client_id"})
    ClientID: string;

    @Column({name:"address"})
    Address: string;

    @Column({name:"status"})
    Status: string;
    
    @Column({name:"billingAddress"})
    BillingAddress: string;
    
    @Column({name:"totalPrice"})
    TotalPrice: number;

    @Column({name:"deliveryDate"})
    DeliveryDate: string;
    
}