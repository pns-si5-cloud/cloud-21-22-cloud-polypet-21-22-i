import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/models/account';
import { Client } from 'src/models/client';
import { Employee } from 'src/models/employee';
import { Partner } from 'src/models/partner';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
      ) {}

    async registerNewPartner(name: string, username:string, password:string): Promise<String> {
        var newPartner = new Partner();

        newPartner.name = name;

        await this.partnerRepository.save(newPartner);
        console.log("New partner (ID : " + newPartner.id + ") registered in the database.");

        await this.createAccount(newPartner.id, username, password);

        return newPartner.id;
    }

    async registerNewEmployee(name: string, surname: string, username:string, password:string): Promise<String> {
        var newEmployee = new Employee();

        newEmployee.name = name;
        newEmployee.surname = surname;

        await this.employeeRepository.save(newEmployee);
        console.log("New employee (ID : " + newEmployee.id + ") registered in the database.");

        await this.createAccount(newEmployee.id, username, password);

        return newEmployee.id;
    }

    async registerNewClient(name: string, surname: string, address: string, mail: string, username:string, password:string): Promise<String> {
        var newClient = new Client();

        newClient.name = name;
        newClient.surname = surname;
        newClient.address = address;
        newClient.mail = mail;

        await this.clientRepository.save(newClient);
        console.log("New client (ID : " + newClient.id + ") registered in the database.");

        await this.createAccount(newClient.id, username, password);

        return newClient.id;
    }

    async findUserWithUserName(username: string) {
        return await this.accountRepository.findOne(username);
    }

    private async createAccount(id: string, username: string, password: string) {
        var newAccount = new Account();

        newAccount.id = id;
        newAccount.username = username;
        newAccount.password = password;

        await this.accountRepository.save(newAccount);
    }
}
