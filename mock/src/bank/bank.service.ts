import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { environment } from 'src/environment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/models/Card';
var parser = require('xml2json');

@Injectable()
export class BankService {
    constructor(
        private http:HttpService,
        @InjectRepository(Card)
        private cardRepository: Repository<Card>){
        }

    private URL_ORDER = environment.order.URL_VALIDATION_ORDER;
        
    //un compte à plusieurs cartes, chaque carte à une valeur amount qui est le solde de la carte

    public async addAmount(cardID:string,amount:number){
        var card = await this.cardRepository.findOne({where:{cardID:cardID}});
        
        card.amount += amount;
        this.cardRepository.save(card);
        console.log("add amount "+amount+" to card in DB:"+JSON.stringify(card));

        return card.amount;
    }
    public addCard(cardID:string,account:string){
        var card = new Card();
        card.cardID = cardID;
        card.account = account;
        card.amount = 0;

        this.cardRepository.save(card);
        console.log("save new card in DB:"+JSON.stringify(card));
    }
    public async getAllCardFromAccount(account:string):Promise<{ cardID: string; amount: number; }[]>{
        var cardList = await this.cardRepository.find({where:{account:account}});

        var totalAmount=[]
        for (var card of cardList){
            totalAmount.push({cardID:card.cardID,amount:card.amount})
        }
        return totalAmount
    }
    public async getTotalAmount(account:string):Promise<number>{
        var totalCard:{cardID:string,amount:number}[]= await this.getAllCardFromAccount(account);

        var totalAmount=0
        for (let el of totalCard){
            totalAmount= totalAmount + el.amount
        }
        return totalAmount;
    }
    public async checkIfCanPay(cardID,amountToPay){
        var card = await this.cardRepository.findOne({where:{cardID:cardID}});

        return (card.amount>=amountToPay)
    }
    
    public async getBalance(account:string):Promise<{ accountID: string; cards: { cardID: string; amount: number; }[]; totalAmount: number; }>{
        var cards:{cardID:string,amount:number}[] = await this.getAllCardFromAccount(account)[1];
        
        var json = {accountID:account,cards:cards,totalAmount:await this.getTotalAmount(account)}
        return json;
    }
    
    public async tryDoTransaction(xml:any,deliveryID:string){
        var json = JSON.parse(parser.toJson(xml))
        var totalToPay = +json["Transaction"]["amount"]
        var account = json["Transaction"]["account"]
        var cardID = json["Transaction"]["card"]

        var status;
        if (await this.checkIfCanPay(cardID,totalToPay)){
            status = "Paiement accepté"
            console.log("[tryDotransaction] The account "+ account + "can pay this amount :"+totalToPay)

        }
        else {
            status = "Paiement refusé"
            console.log("[tryDotransaction] The account "+ account + "can't pay this amount :"+totalToPay)
        }

        var message = {status:status,deliveryID:deliveryID};
        this.http.post(this.URL_ORDER,message)
        .subscribe({
            next : (response)=> console.debug("[tryDoTransaction] status and deliveryID sended to order"),
            error : (error)=> console.error("[tryDoTransaction] "+error),
        });
    }
      /*  public toto(){
        var XMLstring ='<Transaction> <account>team-i</account> <amount>12.51</amount></Transaction>'
        var json = parser.toJson(XMLstring)
        json=JSON.parse(json) 
        var XML = parser.toXml(json)
        console.log(XMLstring)
        var json2 = parser.toJson(XML)
        console.log(json2)
        console.log(XML.toString())
        console.log(json["Transaction"])
        }*/
    
}
