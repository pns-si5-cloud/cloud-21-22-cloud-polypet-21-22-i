import { Component, Input, OnInit } from '@angular/core';
import { ProductRequestNonDetailed } from 'src/app/classes/not-detailed-product-request';
import { ProductCreatorService } from 'src/app/services/product-creator.service';

@Component({
  selector: 'app-product-request-list-item',
  templateUrl: './product-request-list-item.component.html',
  styleUrls: ['./product-request-list-item.component.scss']
})
export class ProductRequestListItemComponent implements OnInit {

  @Input()
  public item!: ProductRequestNonDetailed;
  constructor(private productCreatorService: ProductCreatorService) { }

  ngOnInit(): void {
  }

  validateRequest(request_id:number) {
    this.productCreatorService.validateRequest(request_id);
  }

  deleteRequest(request_id:number) {
    this.productCreatorService.deleteRequest(request_id);
  }

}
