import { Component, Input, OnInit } from '@angular/core';
import { NotDetailedProduct } from 'src/app/classes/not-detailed-product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input()
  productList!:NotDetailedProduct[]|null

  constructor() { }

  ngOnInit(): void {
  }

}
