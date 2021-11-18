import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaiementInformationDTO } from 'src/dto/paiement-information-dto';

@Injectable()
export class ParsePaiementInformationPipe implements PipeTransform {
  transform(paiementInfo: {
      account:string,
      bankCardID:string,
      address:string,
      shoppingCartID:string,
      clientID:string,
      billingAddress:string}, 
    metadata: ArgumentMetadata) {
      console.log(paiementInformation)
    if(!(paiementInfo && paiementInfo.account && paiementInfo.bankCardID && paiementInfo.address && paiementInfo.shoppingCartID && paiementInfo.clientID && paiementInfo.billingAddress)){
      throw new Error("Invalid Paiement Information");
    }

    var paiementInformation:PaiementInformationDTO = new PaiementInformationDTO(paiementInfo.account,paiementInfo.bankCardID,
      paiementInfo.address,paiementInfo.shoppingCartID,paiementInfo.clientID,paiementInfo.billingAddress);

    return paiementInformation;
  }
}
