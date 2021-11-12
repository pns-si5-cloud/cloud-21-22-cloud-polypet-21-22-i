import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'models/Delivery';
import { Items } from 'models/Items';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingService {

    constructor(           
        @InjectRepository(Items)
        private ItemsRepository: Repository<Items>,
        @InjectRepository(Delivery)
        private DeliveryRepository: Repository<Delivery>){
    }

    public async confirmPaiementForDelivery(deliveryID:string){
        var delivery = await this.DeliveryRepository.findOne({where: {deliveryID:deliveryID}});
        delivery.status = "Commande payé. En cours de préparation";
        console.log("change status to paiement confirmed for delivery "+deliveryID);
    }

    public async getDelivery(deliveryID:string){
        var delivery = await this.DeliveryRepository.findOne({where: {deliveryID:deliveryID}});
        console.log("get delivery "+deliveryID + " : "+delivery);
        return delivery;
    }   
}
