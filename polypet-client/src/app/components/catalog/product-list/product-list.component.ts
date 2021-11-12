import { Component, OnInit } from '@angular/core';
import { NotDetailedProduct } from 'src/app/classes/not-detailed-product';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList:NotDetailedProduct[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
