import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-list-item',
  templateUrl: './delivery-list-item.component.html',
  styleUrls: ['./delivery-list-item.component.scss']
})
export class DeliveryListItemComponent implements OnInit {

  @Input()
  public commandID!:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
