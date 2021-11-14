import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Account {

    @PrimaryColumn()
    username: string;

    @Column()
    id: string;

    @Column()
    password: string;
}

