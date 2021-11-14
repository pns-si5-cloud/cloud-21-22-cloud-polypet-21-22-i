import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Items } from 'src/models/Items';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from 'src/models/Delivery';
var parser = require('xml2json');
@Injectable()
export class OrderService {
    private URL_SHOPPING_CART = "http://shopping-cart:3001/shopping-cart"
    private URL_SHIPPING = "http://shipping:cloudsql/paiement-confirmation"
    private URL_BANK = "http://mock:2999/transaction"
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

    public createDelivery(address:string,billingAddress:string,clientID:string,shoppingCartJson:any,items:Items[]){
        var delivery= new Delivery();
        delivery.address=address;
        delivery.billingAddress=billingAddress;
        delivery.clientID=clientID;
        delivery.paiementDate= new Date();
        delivery.status = "En attente de validation de paiement";
        delivery.totalPrice=shoppingCartJson.totalPrice;
        delivery.items=items;
        return delivery;
    }

    public createItems(shoppingCartJson:any){
        var lengtItems=shoppingCartJson.items.length();
        var itemsLocal=[]
        for (let pas = 0; pas < lengtItems; pas++){
            var item = new Items();
            item.productID=shoppingCartJson.items[pas].productID
            item.productName=shoppingCartJson.items[pas].productName
            item.productPrice=shoppingCartJson.items[pas].productPrice
            item.quantity=shoppingCartJson.items[pas].quantity
            itemsLocal.push(item)
        }
        return itemsLocal;
    }
    public saveItemsToRepository(items:Items[]){
        var lengtItems=items.length;
        for (let pas = 0; pas < lengtItems; pas++){
            this.ItemsRepository.save(items[pas])
        }
    }
    public proceedToPayment(account:string,bankCardID:string,clientID:string,cartID:string,address:string,billingAddress:string){
        //# Fonction trop grosse, la fonction fait plus que son nom l'indique : proceed to paiement, create delivery and store...
        var shoppingCartJson = this.getTotalPriceFromShoppingCart(cartID)
        var items = this.createItems(shoppingCartJson);
        var delivery = this.createDelivery(address,billingAddress,clientID,shoppingCartJson,items);
        this.saveItemsToRepository(items)
        this.DeliveryRepository.save(delivery);
        console.log("sauvegarde dans la BDD d'une nouvelle livraison en attente de paiement :"+delivery );
        this.makePayment(account,bankCardID,delivery.deliveryID,shoppingCartJson.totalPrice)

        return delivery.deliveryID;//# Pour que le client puisse consulter sa livraison après.
    }

    public makePayment(account:string,bankCardID:string,deliveryID:string,priceToPay:number){
        console.log( "L'account "+ account + " souhaite payer un montant total de "+priceToPay+" pour la livraison ayant le deliveryID " + deliveryID + " avec la carte bancaire "+bankCardID);
        var json={Transaction:{account:account,amount:priceToPay,card:bankCardID}}
        var xml = parser.toXml(json)
        var message = {xml:xml,deliveryID:deliveryID};
        this.http.post(this.URL_BANK,message)
        .subscribe({
            next : (response)=> console.debug("[makePayment] deliveryID  and xml sended to bank"+deliveryID+ " xml : "+xml.toString()),
            error : (error)=> console.error("[makePayment] "+error),
        });
        //Pas de banque pour l'instant
        //TODO envoyer les infos à la banque
    }

    public validation(status:string,deliveryID:string){
        console.log("La banque renvoie une validation status "+ status +" vers order pour le deliveryID :"+deliveryID)
        if (status=="OK"){
                var message = {deliveryID:deliveryID};
                this.http.post(this.URL_SHIPPING,message)
                .subscribe({
                    next : (response)=> console.debug("[validation] deliveryID:" + deliveryID +" sended to shipping"),
                    error : (error)=> console.error("[validation] "+error),
                });
        }
        return status//pas de banque pour l'instant
        //TODO envoyé à shipping la confirmation de paiement
    }

}
