import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandStatusDTO } from 'dto/command-status-dto';
import { Delivery } from 'models/Delivery';
import { ShippingService } from './shipping.service';

@Controller('')
export class ShippingController {
    public constructor(private shippingService:ShippingService){}

    @Post("paiement-confirmation")
    paiementConfirmation(@Body("deliveryID") deliveryID:string){
        console.log("[paiement-confirmation] deliveryID:"+deliveryID);
        this.shippingService.confirmPaiementForDelivery(deliveryID);
    }

    @Get("get-command-status")
    async getCommandStatus(@Body("deliveryID") deliveryID:string):Promise<CommandStatusDTO>{
        console.log("[get-command-status] deliveryID:"+deliveryID);

        var delivery:Delivery = await this.shippingService.getDelivery(deliveryID);
        var commandStatusDTO = CommandStatusDTO.createCommandStatusDTOFromDelivery(delivery);
        console.log("return command status : "+JSON.stringify(commandStatusDTO));

        return commandStatusDTO;
    }
}
