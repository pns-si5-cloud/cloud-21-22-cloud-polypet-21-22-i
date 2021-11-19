import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("card")
export class Card {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    cardID: string;

    @Column()
    account: string;

    @Column({type:"double precision"})
    amount: number;
}