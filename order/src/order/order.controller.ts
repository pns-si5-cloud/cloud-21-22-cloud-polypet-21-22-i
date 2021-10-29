import { Controller ,Post,Body} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){
    }
    
    @Post('proceed-to-payment')
    proceedToPayment(@Body('cartID') cartID:string,@Body('clientID') clientID:string,@Body('address') address:string,@Body('billingAddress')billingAddress:string) {
        console.log("[order][proceedToPayment] cartID:string "+ cartID + "clientID:string "+clientID + " address:string "+address+" billingAddress:string "+ billingAddress);

        return this.orderService.proceedToPayment(cartID,clientID,address,billingAddress);
    }
    @Post('validation')
    validation(@Body('cartID') cartID:string) {
        console.log("[order][validation] cartID:string "+ cartID);

        return this.orderService.validation(cartID);
    }

}
