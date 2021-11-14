import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  addProduct(product:Product){
    console.log(product)
    this.productCreatorService.addProduct(product)
  }

}
