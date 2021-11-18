import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaiementInformationDTO } from '../classes/paiement-information-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) {
   }

  proceedToPayment(paiementInformation:PaiementInformationDTO) {
    this.http.post(environment.order.PROCEED_TO_PAYMENT,{"paiementInformation":paiementInformation}).subscribe({
      next:() => alert("Request sent"),
      error:(err) => alert("Unable to send the request of the paymentInformation " + PaiementInformationDTO.name)
    })
  }
}
