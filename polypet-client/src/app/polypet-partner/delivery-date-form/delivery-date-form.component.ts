import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delivery-date-form',
  templateUrl: './delivery-date-form.component.html',
  styleUrls: ['./delivery-date-form.component.scss']
})
export class DeliveryDateFormComponent implements OnInit {

  @Output("setDeliveryDateProcess")
  doAddProductProcess: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const fields = form.value
    const deliveryDate = fields.deliveryDate

    this.doAddProductProcess.emit(deliveryDate);
}
}
