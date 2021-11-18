import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../../../classes/shopping-cart-item";

@Component({
  selector: 'app-shopping-cart-item-list-item',
  templateUrl: './shopping-cart-item-list-item.component.html',
  styleUrls: ['./shopping-cart-item-list-item.component.scss']
})
export class ShoppingCartItemListItemComponent implements OnInit {

  @Input()
  public item!:ShoppingCartItem;
  constructor() { }

  ngOnInit(): void {
  }

}
