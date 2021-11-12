import { Controller ,Post,Body} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){
    }
    
    @Post('proceed-to-payment')
    proceedToPayment(@Body('bankCardID') bankCardID:string, @Body('shoppingCartID') shoppingCartID:string, @Body('clientID') clientID:string,@Body('address') address:string,@Body('billingAddress') billingAddress:string) {
        console.log("[order][proceedToPayment] shoppingCartID:string "+ shoppingCartID + "clientID:string "+clientID + " address:string "+address+" billingAddress:string "+ billingAddress);

        return this.orderService.proceedToPayment(bankCardID,shoppingCartID,clientID,address,billingAddress);
    }
    
    @Post('validation')
    validation(@Body('shoppingCartID') shoppingCartID:string) {
        console.log("[order][validation] shoppingCartID:string "+ shoppingCartID);

        return this.orderService.validation(shoppingCartID);
    }

}
