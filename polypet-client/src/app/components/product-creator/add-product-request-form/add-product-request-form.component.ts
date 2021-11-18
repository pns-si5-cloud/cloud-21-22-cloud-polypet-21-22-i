import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-add-product-request-form',
  templateUrl: './add-product-request-form.component.html',
  styleUrls: ['./add-product-request-form.component.scss']
})
export class AddProductRequestFormComponent implements OnInit {

  @Output("doAddProductRequestPrecess")
  doAddProductRequestPrecess: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const name = fields.name
    const price = fields.price
    const category = fields.category
    const description = fields.description
    const partnerID = fields.partnerID
    const ingredient = fields.ingredient
    const dimension = fields.dimension

    const productRequest = new Product(name,price,category,description,partnerID,ingredient,dimension)
    this.doAddProductRequestPrecess.emit(productRequest)
}

}
