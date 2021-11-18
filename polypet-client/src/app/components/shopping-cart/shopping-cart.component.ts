import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../classes/shopping-cart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart:Promise<ShoppingCart>|undefined

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart = this.getShoppingCart();
  }

  private getShoppingCart() {
    return this.shoppingCartService.getShoppingCartByClientID().catch((err)=>{
      console.error(err);
      return new ShoppingCart("","",0);
    });
  }
}
