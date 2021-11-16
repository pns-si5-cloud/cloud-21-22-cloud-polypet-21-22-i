import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Account {

    @PrimaryColumn()
    username: string;

    @Column()
    id: string;

    @Column()
    password: string;

    public static createAccountFromModelsDTO(models:any):Account{
        var account = new Account();
        account.id = models.id;
        account.username = models.username;
        account.password = models.password;

        return account;
    }
}

