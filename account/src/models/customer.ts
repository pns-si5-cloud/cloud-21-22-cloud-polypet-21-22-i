import { CustomerDTO } from "src/dto/customer-dto";
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

    public static createCustomerFromCustomerDTO(customerDTO: CustomerDTO) : Customer {
        var customer = new Customer();
        customer.address = customerDTO.address;
        customer.mail = customerDTO.mail;
        customer.name = customerDTO.name;
        customer.surname = customerDTO.surname;

        return customer;
    }
}

