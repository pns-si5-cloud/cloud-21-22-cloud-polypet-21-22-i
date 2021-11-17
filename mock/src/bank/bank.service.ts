import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
var parser = require('xml2json');

@Injectable()
export class BankService {
    constructor(
        private http:HttpService){
        }

    private URL_ORDER = "http://order:3003/order/validation"
    private _dictCardToAmount = {};
    private _dictCardToAccount = {};
        
    //un compte à plusieurs cartes, chaque carte à une valeur amount qui est le solde de la carte

    public addAmount(card:string,amount:number){
        this._dictCardToAmount[card] = this._dictCardToAmount[card] + amount;
    }
    public addCard(card:string,account:string){
        this._dictCardToAccount[card] = account;
        this._dictCardToAmount[card] = 0;
    }
    public getAllCardFromAccount(account:string){
        var totalCard=[]
        var totalAmount=[]
        for (var card in this._dictCardToAccount){
            if (this._dictCardToAccount[card]==account){
                totalCard.push(card)
                totalAmount.push({cardID:card,amount:this._dictCardToAmount[card]})
                
            }
        }
        return [totalCard,totalAmount]
    }
    public getTotalAmount(account:string){
        var totalCard=this.getAllCardFromAccount(account)[1]
        var TotalAmount=0
        for (let pas = 0 ; pas<totalCard.length ;pas++){
                TotalAmount= TotalAmount+totalCard[pas].amount
            }
        return TotalAmount;
    }
    public checkIfCanPay(card,amountToPay){
        return (this._dictCardToAmount[card]>=amountToPay)
    }
    
    public getBalance(account:string):{accountID:string,cards:{cardID:string,amount:number}[],totalAmount:number}{
        var cards:{cardID:string,amount:number}[] = this.getAllCardFromAccount(account)[1];
        
        var json = {accountID:account,cards:cards,totalAmount:this.getTotalAmount(account)}
        return json;
    }
    
    public tryDoTransaction(xml:any,deliveryID:string){
        var json = JSON.parse(parser.toJson(xml))
        var totalToPay = +json["Transaction"]["amount"]
        var account = json["Transaction"]["account"]
        var card = json["Transaction"]["card"]

        var status;
        if (this.checkIfCanPay(card,totalToPay)){
            this.addAmount(card,-totalToPay)
            status = "Paiement accepté"
            console.log("[tryDotransaction] The account "+ account + "can pay this amount :"+totalToPay+" amount is now :"+this._dictCardToAmount[card])

        }
        else {
            status = "Paiement refusé"
            console.log("[tryDotransaction] The account "+ account + "can't pay this amount :"+totalToPay+" because his current account amount is "+this._dictCardToAmount[card])
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
