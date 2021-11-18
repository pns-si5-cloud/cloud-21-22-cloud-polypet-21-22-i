import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
import { BankService } from './bank.service';

@Controller('')
export class BankController {
    public constructor(private BankService:BankService){}

    @Post("transaction")
    paiementConfirmation(@Body("xml",ParseNotNullPipe) xml:any,@Body('deliveryID',ParseNotNullPipe) deliveryID:string){
        console.log("[transaction] xml:"+xml+ " deliveryID:"+deliveryID);
        this.BankService.tryDoTransaction(xml,deliveryID);
    }

    @Post("add-card")
    addCard(@Body("account",ParseNotNullPipe) account:string,@Body("card",ParseNotNullPipe) card:string){
        console.log("[add-card] account :"+ account + " card :"+card);
        this.BankService.addCard(card,account);
    }

    @Get("balance")
    balance(@Query("accountID",ParseNotNullPipe) accountID:string){
        console.log("[balance] accountID :"+ accountID);
        return this.BankService.getBalance(accountID);
    }

    @Post("add-amount")
    addAmount(@Body("card",ParseNotNullPipe) card:string,@Body("amount",ParseNotNullPipe) amount:string){
        console.log("[add-amount] card :"+ card + " amount :"+amount);
        this.BankService.addAmount(card,+amount);
    }

}