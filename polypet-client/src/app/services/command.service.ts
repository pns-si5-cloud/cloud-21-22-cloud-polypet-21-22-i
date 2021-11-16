import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandStatus } from '../classes/command-status';
import { DeliveryInfo } from '../classes/delivery-info';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private http: HttpClient) { }

  getAllCommandID():Promise<string[]>{
    return firstValueFrom(this.http.get<string[]>(environment.command_url.COMMAND_GET_ALL_COMMAND_ID));
  }

  getCommand(commandID:string):Promise<CommandStatus>{
    return firstValueFrom(this.http.get<CommandStatus>(environment.command_url.COMMAND_GET_COMMAND_STATUS,{params:{commandID}})
      .pipe(map((data: object)=>CommandStatus.fromJSON(data))));
  }

  getDeliveryInfo(commandID:string):Promise<DeliveryInfo>{
    return firstValueFrom(this.http.get<DeliveryInfo>(environment.command_url.COMMAND_GET_DELIVERY_INFO,{params:{commandID}})
      .pipe(map((data: object)=>DeliveryInfo.fromJSON(data))));
  }

  setDeliveryDate(commandID:string,deliveryDate:Date){
    var message = {deliveryID:commandID,deliveryDate:deliveryDate }
    this.http.post(environment.command_url.COMMAND_SET_DELIVERY_DATE,message)
      .subscribe({
        next:()=>alert("Delivery date sended"),
        error:(err)=>alert("Impossible to send the delivery date "+deliveryDate)
      })
  }
}
