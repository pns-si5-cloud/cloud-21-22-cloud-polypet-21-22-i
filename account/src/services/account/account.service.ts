import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/models/Client';
import { Employee } from 'src/models/Employee';
import { Partner } from 'src/models/Partner';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>
      ) {}

    async registerNewPartner(name: string): Promise<String> {
        var newPartner = new Partner();

        newPartner.name = name;

        await this.partnerRepository.save(newPartner);
        console.log("New partner (ID : " + newPartner.id + ") registered in the database.");

        return newPartner.id;
    }

    async registerNewEmployee(name: string, surname: string): Promise<String> {
        var newEmployee = new Employee();

        newEmployee.name = name;
        newEmployee.surname = surname;

        await this.employeeRepository.save(newEmployee);
        console.log("New employee (ID : " + newEmployee.id + ") registered in the database.");

        return newEmployee.id;
    }

    async registerNewClient(username:string, name: string, surname: string, address: string, mail: string): Promise<String> {
        var newClient = new Client();

        newClient.username = username;
        newClient.name = name;
        newClient.surname = surname;
        newClient.address = address;
        newClient.mail = mail;

        await this.clientRepository.save(newClient);
        console.log("New client (ID : " + newClient.id + ") registered in the database.");

        return newClient.id;
    }
}
