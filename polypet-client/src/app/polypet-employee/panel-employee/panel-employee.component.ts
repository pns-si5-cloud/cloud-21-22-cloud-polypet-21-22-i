import { Component, OnInit } from '@angular/core';
import { ProductRequestNonDetailed } from 'src/app/classes/not-detailed-product-request';
import { Product } from 'src/app/classes/product';
import { AddProductFormComponent } from 'src/app/components/product-creator/add-product-form/add-product-form.component';
import { ProductCreatorService } from 'src/app/services/product-creator.service';

@Component({
  selector: 'app-panel-employee',
  templateUrl: './panel-employee.component.html',
  styleUrls: ['./panel-employee.component.scss']
})
export class PanelEmployeeComponent implements OnInit {

  constructor(private productCreatorService:ProductCreatorService) { }
  allProductRequestNotDetailed:Promise<ProductRequestNonDetailed[]>|undefined

  ngOnInit(): void {
    this.allProductRequestNotDetailed = this.getAllProductRequest();
  }

  addProduct(productSerialize:any){
    const product = Product.fromJSON(productSerialize)
    console.log(product)
    this.productCreatorService.addProduct(product)
  }

  getAllProductRequest(): Promise<ProductRequestNonDetailed[]> {
    return this.productCreatorService.getAllProductRequestNotDetailed().catch((err)=>{
      console.error(err);
      return []
    })
  }

}
