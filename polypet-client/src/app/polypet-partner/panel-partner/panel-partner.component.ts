import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { CommandService } from 'src/app/services/command.service';
import { ProductCreatorService } from 'src/app/services/product-creator.service';

@Component({
  selector: 'app-panel-partner',
  templateUrl: './panel-partner.component.html',
  styleUrls: ['./panel-partner.component.scss']
})
export class PanelPartnerComponent implements OnInit {

  constructor(private commandService:CommandService, private productCreatorService: ProductCreatorService) { }

  allCommandID:Promise<string[]>|undefined

  ngOnInit(): void {
    this.allCommandID = this.getAllCommandID();
  }

  async getAllCommandID():Promise<string[]>{
    return this.commandService.getAllCommandID().catch((err)=>{
      console.error(err);
      return []
    })
  }

  addProductRequest(productRequestSerialize:any){
    const productRequest = Product.fromJSON(productRequestSerialize)
    console.log(productRequest);
    this.productCreatorService.addProductRequest(productRequest);
  }

}
