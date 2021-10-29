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
    public proceedToPayment(clientID:string,cartID:string,address:string,billingAddress:string){
        var shoppingCartJson = this.getTotalPriceFromShoppingCart(cartID)
        this.makePayment(clientID,shoppingCartJson.totalPrice)

        var delivery= new Delivery();
        delivery.Address=address;
        delivery.BillingAddress=billingAddress;
        delivery.ClientID=clientID;
        var date =new Date();
        delivery.DeliveryDate= date.toString();
        delivery.Status = this.validation(cartID);
        delivery.TotalPrice=shoppingCartJson.totalPrice;
        var lengtItems=shoppingCartJson.items.length();
        var itemsLocal=[]
        for (let pas = 0; pas < lengtItems; pas++){
            var item = new Items();
            item.ProductID=shoppingCartJson.items[pas].productID
            item.ProductName=shoppingCartJson.items[pas].productName
            item.ProductPrice=shoppingCartJson.items[pas].productPrice
            item.Quantity=shoppingCartJson.items[pas].quantity
            itemsLocal.push(item)
            this.ItemsRepository.save(item)
        }
        delivery.items=itemsLocal;
        this.DeliveryRepository.save(delivery);
    }

    public makePayment(clientID:string,priceToPay:number){
        console.log("Le client " + clientID + "souhaite payer un montant total de "+priceToPay)
    }

    public validation(cartID:string){
        console.log("La banque renvoie une validation status 'OK' vers order pour le shopping cart :"+cartID)
        return "OK"//pas de bank pour l'instant
    }

}
