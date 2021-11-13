import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    address: string;

    @Column()
    mail: string;

}

