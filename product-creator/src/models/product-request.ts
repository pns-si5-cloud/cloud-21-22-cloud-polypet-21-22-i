import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ProductRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
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

}

