import { Component, OnInit } from '@angular/core';
import { PaiementInformationDTO } from '../../../classes/paiement-information-dto';
import { OrderService } from 'src/app/services/order.service';
import { NgForm } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/classes/shopping-cart';
@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.scss']
})
export class PaymentPanelComponent implements OnInit {

  shoppingCart:Promise<ShoppingCart>|undefined

  constructor(private orderService:OrderService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart = this.getShoppingCart();
  }

  private getShoppingCart() {
    return this.shoppingCartService.getShoppingCartByClientID().catch((err)=>{
      console.error(err);
      return new ShoppingCart("","",0);
    });
  }

  async proceedToPaymentRequest(form: NgForm){
    console.log(form.value);
    const fields = form.value

    var cartID = "";
    if(this.shoppingCart != undefined){
      cartID = (await this.shoppingCart).cartID;
    }

    var paiementInformationDTO = new PaiementInformationDTO(fields.account,fields.bankCardID,fields.address,cartID,fields.billingAddress)

    console.log(paiementInformationDTO);
    this.orderService.proceedToPayment(paiementInformationDTO)
  }
}
