import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandStatusDTO } from 'src/dto/command-status-dto';
import { DeliveryDateDTO } from 'src/dto/delivery-date-dto';
import { DeliveryInfoDTO } from 'src/dto/delivery-info-dto';
import { Delivery } from 'src/models/Delivery';
import { ParseNotNullPipe } from 'src/pipe/parse-not-null.pipe';
import { ParseDeliveryDateDTOPipe } from 'src/pipe/parse-delivery-date-dto.pipe';
import { ShippingService } from './shipping.service';

@Controller('')
export class ShippingController {
    public constructor(private shippingService:ShippingService){}

    @Post("paiement-confirmation")
    paiementConfirmation(@Body("deliveryID",ParseNotNullPipe) deliveryID:string){
        console.log("[paiement-confirmation] deliveryID:"+deliveryID);
        this.shippingService.confirmPaiementForDelivery(deliveryID);
    }

    @Get("get-command-status")
    async getCommandStatus(@Query("deliveryID",ParseNotNullPipe) deliveryID:string):Promise<CommandStatusDTO>{
        console.log("[get-command-status] deliveryID:"+deliveryID);

        var delivery:Delivery = await this.shippingService.getDelivery(deliveryID);
        var commandStatusDTO = CommandStatusDTO.createCommandStatusDTOFromDelivery(delivery);
        console.log("return command status : "+JSON.stringify(commandStatusDTO));

        return commandStatusDTO;
    }

    @Post("set-delivery-date")
    setDeliveryDate(@Body(ParseDeliveryDateDTOPipe) deliveryDateDTO:DeliveryDateDTO){
        console.log("[set-delivery-date] deliveryDateDTO:"+JSON.stringify(deliveryDateDTO));

        this.shippingService.setDeliveryDate(deliveryDateDTO);
    }

    @Get("delivery-information")
    async getDeliveryInformation(@Query("deliveryID",ParseNotNullPipe) deliveryID:string):Promise<DeliveryInfoDTO>{
        console.log("[delivery-information] deliveryID:"+deliveryID);

        var delivery = await this.shippingService.getDelivery(deliveryID);
        var deliveryInfoDTO = DeliveryInfoDTO.createDeliveryInfoDTOFromDelivery(delivery);

        console.log("return delivery info : "+JSON.stringify(deliveryInfoDTO));
        return deliveryInfoDTO;
    }

    @Get("client-command")
    async getClientCommand(@Query("clientID",ParseNotNullPipe) clientID:string):Promise<string[]>{
        console.log("[client-command] clientID:"+clientID);

        var commandList = await this.shippingService.getCommandListFromClientID(clientID);
        
        console.log("return commands ID list : "+commandList);
        return commandList;
    }
}
