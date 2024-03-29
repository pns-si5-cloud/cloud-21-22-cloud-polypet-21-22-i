import {Entity, Column, PrimaryColumn} from "typeorm";
import { Items } from "./Items";
import { OneToMany,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Delivery {

    @PrimaryGeneratedColumn("uuid",{name:"delivery_id"})
    deliveryID: string;

    @OneToMany(type => Items, items => items.delivery)
    items: Items[];

    @Column({name:"client_id"})
    clientID: string;

    @Column({name:"address"})
    address: string;

    @Column({name:"status"})
    status: string;
    
    @Column({name:"billing_address"})
    billingAddress: string;
    
    @Column({type:"double precision",name:"total_price"})
    totalPrice: number;

    @Column({name:"paiement_date"})
    paiementDate: Date;

    @Column({nullable:true, name:"delivery_date"})
    deliveryDate: Date;
    
}