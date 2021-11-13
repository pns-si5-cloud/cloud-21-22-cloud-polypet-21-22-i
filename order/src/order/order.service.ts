import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Items } from 'src/models/Items';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from 'src/models/Delivery';
@Injectable()
export class OrderService {
    private URL_SHOPPING_CART = "http://shopping-cart:3001/shopping-cart"
    constructor(           
        @InjectRepository(Items)
        private ItemsRepository: Repository<Items>,
        @InjectRepository(Delivery)
        private DeliveryRepository: Repository<Delivery>,
        private http:HttpService){
        }

    public getTotalPriceFromShoppingCart(cartID:string){
        var shoppingCartJson
        firstValueFrom(this.http.get(this.URL_SHOPPING_CART, {params: {cartID:cartID}}))
            .then((body)=> {
                shoppingCartJson = body.data;
            });
        return shoppingCartJson

    }

    public proceedToPayment(bankCardID:string,clientID:string,cartID:string,address:string,billingAddress:string){
        //# Fonction trop grosse, la fonction fait plus que son nom l'indique : proceed to paiement, create delivery and store...
        var shoppingCartJson = this.getTotalPriceFromShoppingCart(cartID)
        this.makePayment(bankCardID,clientID,shoppingCartJson.totalPrice)

        var delivery= new Delivery();
        delivery.address=address;
        delivery.billingAddress=billingAddress;
        delivery.clientID=clientID;
        delivery.paiementDate= new Date();;
        delivery.status = "En attente de validation de paiement";
        delivery.totalPrice=shoppingCartJson.totalPrice;

        var lengtItems=shoppingCartJson.items.length();
        var itemsLocal=[]
        for (let pas = 0; pas < lengtItems; pas++){
            var item = new Items();
            item.productID=shoppingCartJson.items[pas].productID
            item.productName=shoppingCartJson.items[pas].productName
            item.productPrice=shoppingCartJson.items[pas].productPrice
            item.quantity=shoppingCartJson.items[pas].quantity
            itemsLocal.push(item)
            this.ItemsRepository.save(item)
        }
        delivery.items=itemsLocal;

        this.DeliveryRepository.save(delivery);
        console.log("sauvegarde dans la BDD d'une nouvelle livraison en attente de paiement :"+delivery );

        return delivery.deliveryID;//# Pour que le client puisse consulter sa livraison après.
    }

    public makePayment(bankCardID:string,clientID:string,priceToPay:number){
        console.log("Le client " + clientID + "souhaite payer un montant total de "+priceToPay+ " avec la carte bancaire "+bankCardID);
        //Pas de banque pour l'instant
        //TODO envoyer les infos à la banque
    }

    public validation(cartID:string){
        console.log("La banque renvoie une validation status 'OK' vers order pour le shopping cart :"+cartID)
        return "OK"//pas de banque pour l'instant
        //TODO envoyé à shipping la confirmation de paiement
    }

}
