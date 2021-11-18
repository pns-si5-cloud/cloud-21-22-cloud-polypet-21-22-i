export class Card {

    public constructor(cardID:string, amount:number){
        this.cardID = cardID;
        this.amount = amount;
    }

    public static fromJSON(JSON:any){
        var card = new Card(JSON.cardID,+JSON.amount);
        return card;
    }

    public cardID:string;
    public amount:number;
}
