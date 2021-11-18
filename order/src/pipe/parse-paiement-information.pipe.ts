import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaiementInformationDTO } from 'src/dto/paiement-information-dto';

@Injectable()
export class ParsePaiementInformationPipe implements PipeTransform {
  transform(paiementInfo: {
      _account:string,
      _bankCardID:string,
      _address:string,
      _shoppingCartID:string,
      _billingAddress:string}, 
    metadata: ArgumentMetadata) {
    console.log(paiementInfo)
    if(!(paiementInfo && paiementInfo._account && paiementInfo._bankCardID && paiementInfo._address && paiementInfo._shoppingCartID && paiementInfo._billingAddress)){
      console.log(paiementInfo._account)
      console.log(paiementInfo._bankCardID)
      console.log(paiementInfo._address)
      console.log(paiementInfo._shoppingCartID)
      console.log(paiementInfo._billingAddress)
      throw new Error("Invalid Paiement Information");
    }

    var paiementInformation:PaiementInformationDTO = new PaiementInformationDTO(paiementInfo._account,paiementInfo._bankCardID,
      paiementInfo._address,paiementInfo._shoppingCartID,paiementInfo._billingAddress);

    return paiementInformation;
  }
}
