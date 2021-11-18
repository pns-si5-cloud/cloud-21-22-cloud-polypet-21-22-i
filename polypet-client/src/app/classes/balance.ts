import { Card } from "./card";

export class Balance {

    public constructor(accountID:string, cards:Card[], totalAmount:number){
        this.accountID = accountID;
        this.cards = cards;
        this.totalAmount = totalAmount;
    }

    public static fromJSON(JSON:any){
        
        var cards:Card[] = JSON.cards?.map((card:any)=>Card.fromJSON(card));

        var balance = new Balance(JSON.account,cards,+JSON.totalAmount);

        return balance;
    }

    public accountID:string;
    public cards:Card[];
    public totalAmount:number;
}
