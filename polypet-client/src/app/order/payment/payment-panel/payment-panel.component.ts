import { Component, OnInit } from '@angular/core';
import { PaiementInformationDTO } from '../../../classes/paiement-information-dto';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.scss']
})
export class PaymentPanelComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
  }

  proceedToPaymentRequest(paiementInformation:any){
    const productRequest = PaiementInformationDTO.fromJSON(paiementInformation)
    console.log(productRequest);
    this.orderService.proceedToPayment(productRequest)
  }
}
