import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../../../classes/shopping-cart-item";

@Component({
  selector: 'app-shopping-cart-item-list',
  templateUrl: './shopping-cart-item-list.component.html',
  styleUrls: ['./shopping-cart-item-list.component.scss']
})
export class ShoppingCartItemListComponent implements OnInit {
  @Input()
  shoppingCartItemList!:ShoppingCartItem[]|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
