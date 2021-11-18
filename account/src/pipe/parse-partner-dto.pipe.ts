import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PartnerDTO } from 'src/dto/partner-dto';

@Injectable()
export class ParsePartnerDtoPipe implements PipeTransform {

  transform(partner: 
    {name:string, username:string,password:string}, 
    metadata: ArgumentMetadata):PartnerDTO
  {
    if(!(partner && partner.name && partner.username && partner.password)){
      throw new Error("Invalid partner DTO " + JSON.stringify(partner));
    }

    var partnerDTO = new PartnerDTO(
      partner.name,
      partner.username,
      partner.password);
    
    return partnerDTO;
  }
}
