import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryDateDTO } from 'src/dto/delivery-date-dto';
import { Delivery } from 'src/models/Delivery';
import { Items } from 'src/models/Items';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingService {

    constructor(           
        @InjectRepository(Items)
        private ItemsRepository: Repository<Items>,
        @InjectRepository(Delivery)
        private deliveryRepository: Repository<Delivery>){
    }

    public async confirmPaiementForDelivery(deliveryID:string){
        var delivery:Delivery = await this.getDelivery(deliveryID);
        delivery.status = "Commande payée. En cours de préparation";
        console.log("change status to paiement confirmed for delivery "+deliveryID);
    }

    public async getDelivery(deliveryID:string){
        var delivery:Delivery = await this.deliveryRepository.findOne({where: {deliveryID:deliveryID}});
        console.log("get delivery "+deliveryID + " : "+delivery);
        return delivery;
    }   

    public async setDeliveryDate(deliveryDateDTO:DeliveryDateDTO){
        var delivery:Delivery = await this.getDelivery(deliveryDateDTO.deliveryID);
        delivery.status = "En cours de livraison";
        delivery.deliveryDate = deliveryDateDTO.deliveryDate;
    }

    public async getCommandListFromClientID(clientID:string):Promise<string[]>{
        var deliveries:Delivery[] = await this.deliveryRepository.find({where: {clientID:clientID}});
        var deliveryIDList:string[] = [];

        for(let delivery of deliveries){
            deliveryIDList.push(delivery.deliveryID);
        }
        return deliveryIDList;
    }
}
