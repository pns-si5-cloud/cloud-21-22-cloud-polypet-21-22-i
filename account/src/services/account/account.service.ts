import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDTO } from 'src/dto/customer-dto';
import { EmployeeDTO } from 'src/dto/employee-dto';
import { PartnerDTO } from 'src/dto/partner-dto';
import { Account } from 'src/models/account';
import { Customer } from 'src/models/customer';
import { Employee } from 'src/models/employee';
import { Partner } from 'src/models/partner';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
      ) {}

    async registerNewPartner(partnerDTO:PartnerDTO): Promise<String> {
        var newPartner:Partner = Partner.createPartnerFromPartnerDTO(partnerDTO);

        await this.partnerRepository.save(newPartner);
        console.log("New partner (ID : " + newPartner.id + ") registered in the database.");

        partnerDTO.id = newPartner.id;
        await this.createAccount(partnerDTO);

        return newPartner.id;
    }

    async registerNewEmployee(employeeDTO: EmployeeDTO): Promise<String> {
        var newEmployee:Employee = Employee.createEmployeeFromEmployeeDTO(employeeDTO);

        await this.employeeRepository.save(newEmployee);
        console.log("New employee (ID : " + newEmployee.id + ") registered in the database.");

        employeeDTO.id = newEmployee.id;
        await this.createAccount(employeeDTO);

        return newEmployee.id;
    }

    async registerNewCustomer(customerDTO: CustomerDTO): Promise<String> {
        var newCustomer:Customer = Customer.createCustomerFromCustomerDTO(customerDTO);

        await this.customerRepository.save(newCustomer);
        console.log("New client (ID : " + newCustomer.id + ") registered in the database.");

        customerDTO.id = newCustomer.id;
        await this.createAccount(customerDTO);

        return newCustomer.id;
    }

    async findUserWithUserName(username: string) {
        return await this.accountRepository.findOne(username);
    }

    private async createAccount(models:any) {
        var newAccount:Account = Account.createAccountFromModelsDTO(models);

        console.log("New account (username : " + newAccount.username + ") created in the database.");

        await this.accountRepository.save(newAccount);
    }
}
