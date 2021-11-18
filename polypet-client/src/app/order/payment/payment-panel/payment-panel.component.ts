import { Component, OnInit } from '@angular/core';
import { PaiementInformationDTO } from '../../../classes/paiement-information-dto';
import { OrderService } from 'src/app/services/order.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.scss']
})
export class PaymentPanelComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
  }


  proceedToPaymentRequest(form: NgForm){
    console.log(form.value);
    const fields = form.value
    var paiementInformationDTO = new PaiementInformationDTO(fields.account,fields.bankCardID,fields.address,fields.shoppingCartID,fields.clientID,fields.billingAddress)

    console.log(paiementInformationDTO);
    this.orderService.proceedToPayment(paiementInformationDTO)
  }
}
