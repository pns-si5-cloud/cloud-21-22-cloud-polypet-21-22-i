import { Body, Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AccountService } from 'src/services/account/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private authService: AuthService) {}

    @Post('new-customer')
    registerNewCustomer(
    @Body('name') name:string, 
    @Body('surname') surname:string,
    @Body('address') address:string,
    @Body('mail') mail:string,
    @Body('username') username:string,
    @Body('password') password:string): Promise<String> {
        console.log("[registerNewCustomer] A new client wants to register to Polypet.");

        return this.accountService.registerNewCustomer(name, surname, address, mail, username, password);
    }

    @Post('new-employee')
    registerNewEmployee(@Body('name') name:string, 
    @Body('surname') surname:string,
    @Body('username') username:string,
    @Body('password') password:string): Promise<String> {
        console.log("[registerNewEmployee] A new employee is welcomed to Polypet.");

        return this.accountService.registerNewEmployee(name, surname, username, password);
    }

    @Post('new-partner')
    registerNewPartner(@Body('name') name:string,
    @Body('username') username:string,
    @Body('password') password:string): Promise<String> {
        console.log("[registerNewPartner] A new partner wants to register to Polypet.");

        return this.accountService.registerNewPartner(name, username, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log("[login]");
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log("[getProfile]");
      return req.user;
    }
}
