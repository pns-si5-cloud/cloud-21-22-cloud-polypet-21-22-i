import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductCreatorService } from 'src/app/services/product-creator.service';

@Component({
  selector: 'app-product-request-view',
  templateUrl: './product-request-view.component.html',
  styleUrls: ['./product-request-view.component.scss']
})
export class ProductRequestViewComponent implements OnInit {

  productRequest:Product = new Product("Loading",0,"Loading","Loading","Loading","Loading","Loading")
  private idProduct:any

  constructor(private route: ActivatedRoute,
    private productCreatorService: ProductCreatorService) { }

  async ngOnInit() {
    await this.route.params.subscribe(async params => {
      this.idProduct = params['id'];
      this.productRequest =  await this.productCreatorService.getProductRequestDetailed(this.idProduct);
      console.log(this.productRequest)
   })
  }

}
