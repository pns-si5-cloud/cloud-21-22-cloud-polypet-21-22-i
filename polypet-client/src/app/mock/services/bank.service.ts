import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Balance } from 'src/app/classes/balance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  addCard(accountID:string,cardID:string){
    var message = {account:accountID,card:cardID}
    this.http.post<void>(environment.mock.BANK_ADD_CARD,message).subscribe({
      next:() => { alert("Card added.");},
      error:(err) => alert("Unable to add new card " + cardID)
    });
  }

  addAmount(cardID:string,amount:number){
    var message = {card:cardID,amount:amount}
    this.http.post<void>(environment.mock.BANK_ADD_AMOUNT,message).subscribe({
      next:() => { alert("New Amount added.");},
      error:(err) => alert("Unable to add new amount " + cardID)
    });
  }

  async getBalance(accountID:string): Promise<Balance>{
    return firstValueFrom(this.http.get<Balance>(environment.mock.BANK_BALANCE,{params:{accountID:accountID}})
      .pipe(map((data: object)=>Balance.fromJSON(data))));
  }
}
