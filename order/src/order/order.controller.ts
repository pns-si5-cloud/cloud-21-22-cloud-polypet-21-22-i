import { Controller ,Post,Body} from '@nestjs/common';
import { OrderService } from './order.service';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
import { Delivery } from 'src/models/Delivery';
import { ParsePaiementInformationPipe } from 'src/pipe/parse-paiement-information.pipe';
import { PaiementInformationDTO } from 'src/dto/paiement-information-dto';
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){
    }
    
    @Post('proceed-to-payment')
    async proceedToPayment(@Body('clientID',ParseNotNullPipe) clientID,
        @Body('paiementInformation',ParsePaiementInformationPipe) paiementInformation:PaiementInformationDTO) {
        console.log("[order][proceedToPayment] clientID :"+clientID +" paiementInformation:"+JSON.stringify(paiementInformation));

        var delivery:Delivery = await this.orderService.createDelivery(paiementInformation.shoppingCartID,clientID,
            paiementInformation.address,paiementInformation.billingAddress);

        return this.orderService.makePayment(paiementInformation.account,paiementInformation.bankCardID,
            delivery.deliveryID,delivery.totalPrice);
    }
    
    @Post('validation')
    validation(@Body('status') status:string,@Body('deliveryID') deliveryID:string) {
        console.log("[order][validation] status:string "+ status + " deliveryID " + deliveryID);

        return this.orderService.validation(status,deliveryID);
    }
}
