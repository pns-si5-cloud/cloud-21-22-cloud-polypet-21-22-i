import { Body, Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CustomerDTO } from 'src/dto/customer-dto';
import { EmployeeDTO } from 'src/dto/employee-dto';
import { PartnerDTO } from 'src/dto/partner-dto';
import { ParseCustomerDtoPipe } from 'src/pipe/parse-customer-dto.pipe';
import { ParseEmployeeDtoPipe } from 'src/pipe/parse-employee-dto.pipe';
import { ParsePartnerDtoPipe } from 'src/pipe/parse-partner-dto.pipe';
import { AccountService } from 'src/services/account/account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private authService: AuthService) {}

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
