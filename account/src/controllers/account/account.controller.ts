import { Body, Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { CustomerDTO } from 'src/dto/customer-dto';
import { EmployeeDTO } from 'src/dto/employee-dto';
import { PartnerDTO } from 'src/dto/partner-dto';
import { ParseCustomerDtoPipe } from 'src/pipe/parse-customer-dto.pipe';
import { ParseEmployeeDtoPipe } from 'src/pipe/parse-employee-dto.pipe';
import { ParsePartnerDtoPipe } from 'src/pipe/parse-partner-dto.pipe';
import { AccountService } from 'src/services/account/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('new-customer')
    registerNewCustomer(
    @Body('customer', ParseCustomerDtoPipe) customer:CustomerDTO): Promise<String> {
        console.log("[registerNewCustomer] A new client wants to register to Polypet.");

        return this.accountService.registerNewCustomer(customer);
    }

    @Post('new-employee')
    registerNewEmployee(@Body('employee', ParseEmployeeDtoPipe) employee:EmployeeDTO): Promise<String> {
        console.log("[registerNewEmployee] A new employee is welcomed to Polypet.");

        return this.accountService.registerNewEmployee(employee);
    }

    @Post('new-partner')
    registerNewPartner(@Body('partner', ParsePartnerDtoPipe) partner:PartnerDTO): Promise<String> {
        console.log("[registerNewPartner] A new partner wants to register to Polypet.");

        return this.accountService.registerNewPartner(partner);
    }

}
