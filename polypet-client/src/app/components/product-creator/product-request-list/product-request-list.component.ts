import { Component, Input, OnInit } from '@angular/core';
import { ProductRequestNonDetailed } from 'src/app/classes/not-detailed-product-request';

@Component({
  selector: 'app-product-request-list',
  templateUrl: './product-request-list.component.html',
  styleUrls: ['./product-request-list.component.scss']
})
export class ProductRequestListComponent implements OnInit {

  @Input()
  productRequestList!:ProductRequestNonDetailed[]|null

  constructor() { }

  ngOnInit(): void {
  }

}
