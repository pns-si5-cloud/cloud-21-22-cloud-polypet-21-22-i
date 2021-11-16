import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryInfo } from 'src/app/classes/delivery-info';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss']
})
export class DeliveryViewComponent implements OnInit {

  deliveryInfo:DeliveryInfo = new DeliveryInfo([],"Loading",0,new Date());
  commandID:any;

  constructor(private route: ActivatedRoute,
    private commandService:CommandService) { }

  async ngOnInit() {
    await this.route.params.subscribe(async params => {
      this.commandID = params['id'];
      this.deliveryInfo =  await this.commandService.getDeliveryInfo(this.commandID);
      console.log(this.deliveryInfo);
   });
  }

  setDeliveryDate(deliveryDate:Date){//Peut être string ?
    console.log(deliveryDate);
    this.commandService.setDeliveryDate(this.commandID,deliveryDate);
  }
}
