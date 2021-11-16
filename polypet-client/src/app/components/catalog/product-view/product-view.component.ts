import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product:Product = new Product("Loading",0,"Loading","Loading","Loading","Loading","Loading")
  private idProduct:any

  constructor(private route: ActivatedRoute,
    private catalogService: CatalogService) { }

  async ngOnInit() {
    await this.route.params.subscribe(async params => {
      this.idProduct = params['id'];
      this.product =  await this.catalogService.getProductDetail(this.idProduct);
      console.log(this.product)
   });
  }

}
