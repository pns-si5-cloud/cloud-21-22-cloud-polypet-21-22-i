import { Component, OnInit } from '@angular/core';
import { NotDetailedProduct } from 'src/app/classes/not-detailed-product';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private catalogService:CatalogService) { }
  allProductsNotDetailed:Promise<NotDetailedProduct[]>|undefined

  ngOnInit(): void {
    this.allProductsNotDetailed = this.getAllProduct()
  }
  async getAllProduct():Promise<NotDetailedProduct[]>{
    return this.catalogService.getAllProductNotDetails().catch((err)=>{
      console.error(err);
      return []
    })
  }

}
