import { Controller ,Post,Body} from '@nestjs/common';
import { OrderService } from './order.service';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){
    }
    
    @Post('proceed-to-payment')
    proceedToPayment(@Body('account',ParseNotNullPipe) account:string,@Body('bankCardID',ParseNotNullPipe) bankCardID:string, @Body('shoppingCartID',ParseNotNullPipe) shoppingCartID:string, @Body('clientID',ParseNotNullPipe) clientID:string,@Body('address',ParseNotNullPipe) address:string,@Body('billingAddress',ParseNotNullPipe) billingAddress:string) {
        console.log("[order][proceedToPayment] account:"+ account +" shoppingCartID:string "+ shoppingCartID + "clientID:string "+clientID + " address:string "+address+" billingAddress:string "+ billingAddress);

        return this.orderService.proceedToPayment(account,bankCardID,shoppingCartID,clientID,address,billingAddress);
    }
    
    @Post('validation')
    validation(@Body('status',ParseNotNullPipe) status:string,@Body('deliveryID',ParseNotNullPipe) deliveryID:string) {
        console.log("[order][validation] status:string "+ status + " deliveryID " + deliveryID);

        return this.orderService.validation(status,deliveryID);
    }

}
