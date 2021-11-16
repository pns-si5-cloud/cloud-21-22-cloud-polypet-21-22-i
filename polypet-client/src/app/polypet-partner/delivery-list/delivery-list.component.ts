import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  @Input()
  deliveryList!:string[]|null

  constructor() { }

  ngOnInit(): void {
  }

}
