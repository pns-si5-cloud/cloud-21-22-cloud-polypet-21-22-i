import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Partner {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

}

