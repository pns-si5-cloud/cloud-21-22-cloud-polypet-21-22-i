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
        this.deliveryRepository.save(delivery);

        console.log("change status to paiement confirmed :"+JSON.stringify(delivery));
    }

    public async getDelivery(deliveryID:string){
        var delivery:Delivery = await this.deliveryRepository.findOne({where: {deliveryID:deliveryID}});
        console.log("get delivery "+deliveryID + " : "+JSON.stringify(delivery));
        return delivery;
    }
    
    public async getItems(delivery:Delivery){
        var items:Items[] = await this.ItemsRepository.find({where: {delivery:delivery}});
        console.log("get items for delivery : "+delivery + " : items[]"+items);
        return items;
    }      

    public async setDeliveryDate(deliveryDateDTO:DeliveryDateDTO){
        var delivery:Delivery = await this.getDelivery(deliveryDateDTO.deliveryID);

        delivery.status = "En cours de livraison";
        delivery.deliveryDate = deliveryDateDTO.deliveryDate;
        this.deliveryRepository.save(delivery);

        console.log("change status to in shipping :"+JSON.stringify(delivery))
    }

    public async getCommandListFromClientID(clientID:string):Promise<string[]>{
        var deliveries:Delivery[] = await this.deliveryRepository.find({where: {clientID:clientID}});
        var deliveryIDList:string[] = [];

        for(let delivery of deliveries){
            deliveryIDList.push(delivery.deliveryID);
        }
        console.log("get command ID list : "+deliveryIDList)
        return deliveryIDList;
    }
}
