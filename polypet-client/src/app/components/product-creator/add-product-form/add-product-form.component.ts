import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  @Output("doAddProductPrecess")
  doAddProductPrecess: EventEmitter<any> = new EventEmitter();

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

    const product = new Product(name,price,category,description,partnerID,ingredient,dimension)
    this.doAddProductPrecess.emit(product)
}

}
