import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  addCard(accountID:string,cardID:string):Promise<void>{
    var message = {account:accountID,card:cardID}
    return firstValueFrom(this.http.post<void>(environment.mock.BANK_ADD_CARD,message));
  }

  addAmount(cardID:string,amount:number):Promise<void>{
    var message = {card:cardID,amount:amount}
    return firstValueFrom(this.http.post<void>(environment.mock.BANK_ADD_AMOUNT,message));
  }

  async getBalance(accountID:string): Promise<string>{
    this.http.get<string>(environment.mock.BANK_BALANCE,{params:{accountID:accountID}}).subscribe({
        next:(response)=> console.log(response),
        error:(error)=> console.log(error),
      });
      return "coucou"
  }
}
