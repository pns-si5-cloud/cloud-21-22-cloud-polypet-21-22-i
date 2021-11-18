import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DeliveryDateDTO } from 'src/dto/delivery-date-dto';

@Injectable()
export class ParseDeliveryDateDTOPipe implements PipeTransform {
  transform(deliveryDate: {deliveryID:string,deliveryDate:string}, metadata: ArgumentMetadata) {
    
    if(!(deliveryDate.deliveryID && deliveryDate.deliveryDate)){
      throw new Error("Invalide delivery date DTO");
    }

    var deliveryDateDTO = new DeliveryDateDTO(
      deliveryDate.deliveryID,
      new Date(deliveryDate.deliveryDate));

    return deliveryDateDTO;
  }
}
