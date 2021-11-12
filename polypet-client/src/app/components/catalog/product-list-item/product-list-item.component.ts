import { Component, Input, OnInit } from '@angular/core';
import { NotDetailedProduct } from 'src/app/classes/not-detailed-product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input()
  item!:NotDetailedProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
