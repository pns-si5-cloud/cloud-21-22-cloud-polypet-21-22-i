import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from 'src/services/account/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('new-client')
    registerNewClient(@Body('username') username:string,
    @Body('name') name:string, 
    @Body('surname') surname:string,
    @Body('address') address:string,
    @Body('mail') mail:string): Promise<String> {
        console.log("A new client wants to register to Polypet.");

        return this.accountService.registerNewClient(username, name, surname, address, mail);
    }

    @Post('new-employee')
    registerNewEmployee(@Body('name') name:string, 
    @Body('surname') surname:string): Promise<String> {
        console.log("A new employee is welcomed to Polypet.");

        return this.accountService.registerNewEmployee(name, surname);
    }

    @Post('new-partner')
    registerNewPartner(@Body('name') name:string): Promise<String> {
        console.log("A new partner wants to register to Polypet.");

        return this.accountService.registerNewPartner(name);
    }
}
