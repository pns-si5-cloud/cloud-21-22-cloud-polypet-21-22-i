import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Items } from 'src/models/Items';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from 'src/models/Delivery';
import { ShoppingCartInfoDTO } from 'src/dto/shopping-cart-info-dto';
import { ShoppingCartItemDTO } from 'src/dto/shopping-cart-item-dto';
import { ProductInfoDTO } from 'src/dto/product-info-dto';
var parser = require('xml2json');

@Injectable()
export class OrderService {
    private URL_SHOPPING_CART = "http://shopping-cart:3001/shopping-cart"
    private URL_PRODUCT_DETAILED = "http://catalog:3003/get-detailed-product"
    private URL_SHIPPING = "http://shipping:3007/paiement-confirmation"
    private URL_BANK = "http://mock:2999/transaction"

    constructor(           
        @InjectRepository(Items)
        private ItemsRepository: Repository<Items>,
        @InjectRepository(Delivery)
        private DeliveryRepository: Repository<Delivery>,
        private http:HttpService){
        }

    public async getShoppingCart(cartID:string):Promise<ShoppingCartInfoDTO>{
        var shoppingCartJson:{cartID: string, clientID: string,
            items: {
              item: { productID: string; quantity: number }
            }[];
          } = 
          await firstValueFrom(this.http.get(this.URL_SHOPPING_CART, {params: {cartID:cartID}}))
              .then((body)=> {
                  return body.data;
              });
        
        var shoppingCartInfoDTO = new ShoppingCartInfoDTO();
        var shoppingCartItemDTOList = [];

        for(let item of shoppingCartJson.items){
            var scItemDTO = new ShoppingCartItemDTO();
            scItemDTO.productID = item.item.productID;
            scItemDTO.quantity = +item.item.quantity;

            shoppingCartItemDTOList.push(scItemDTO);
        }
        
        shoppingCartInfoDTO.cartID = shoppingCartJson.cartID;
        shoppingCartInfoDTO.clientID = shoppingCartJson.clientID;
        shoppingCartInfoDTO.items = shoppingCartItemDTOList;

        console.log("get shopping cart info :"+shoppingCartInfoDTO);
        return shoppingCartInfoDTO;
    }

    public async getProductInfo(productID:string):Promise<ProductInfoDTO>{
        var productJSON:{name,price,category,description,partnerID,ingredient,productID,addedDate}
            = await firstValueFrom(this.http.get(this.URL_PRODUCT_DETAILED, {params: {productID:productID}}))
            .then((body)=> {
                return body.data;
            });

        var productInfo = new ProductInfoDTO();
        productInfo.name = productJSON.name;
        productInfo.price = +productJSON.price;

        console.log("get product info :"+productInfo);
        return productInfo;
    }

    public createDeliveryInDB(address:string,billingAddress:string,clientID:string,status:string,totalPrice:number,items:Items[]){
        var delivery= new Delivery();

        delivery.address=address;
        delivery.billingAddress=billingAddress;
        delivery.clientID=clientID;
        delivery.paiementDate= new Date();
        delivery.status = status;
        delivery.totalPrice=totalPrice;
        delivery.items=items;

        console.log("create delivery in DB :"+delivery);

        this.DeliveryRepository.save(delivery);
        return delivery;
    }

    public createItemInDB(productID:string,productName:string,productPrice:number,quantity:number){
        var item = new Items();

        item.productID=productID
        item.productName=productName
        item.productPrice=productPrice
        item.quantity=quantity

        this.ItemsRepository.save(item);
        console.log("create item in DB :"+item);

        return item;
    }

    public async createDelivery(shoppingCartID:string,clientID:string,address:string,billingAddress:string):Promise<Delivery>{
        var shoppingCart:ShoppingCartInfoDTO = await this.getShoppingCart(shoppingCartID);
        var productList:ProductInfoDTO[] = [];

        for(let item of shoppingCart.items){
            var productInfo:ProductInfoDTO =  await this.getProductInfo(item.productID);
            productList.push(productInfo);
        }

        var totalPrice:number = this.getTotalPrice(productList,shoppingCart.items);

        var itemsList:Items[] = []
        for(var i =0; i<productList.length;i++){
            var shoppingCartItem = shoppingCart.items[i];

            var item = this.createItemInDB(shoppingCartItem.productID,productList[i].name,
                productList[i].price,shoppingCartItem.quantity);

            itemsList.push(item);
        }
        return this.createDeliveryInDB(address,billingAddress,clientID,"En attente de validation de paiement",totalPrice,itemsList);
    }

    public getTotalPrice(productInfoList:ProductInfoDTO[],shoppingCartItemList:ShoppingCartItemDTO[]):number{
        if(productInfoList.length != shoppingCartItemList.length){
            throw new Error("Not same size");
        }

        var totalPrice:number = 0;

        for(var i =0; i<productInfoList.length;i++){
            totalPrice += productInfoList[i].price * shoppingCartItemList[i].quantity;
        }
        console.log("get total price :"+totalPrice);

        return totalPrice;
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
    }

    public validation(status:string,deliveryID:string){
        console.log("La banque renvoie une validation status "+ status +" vers order pour le deliveryID :"+deliveryID)
        
        if (status=="Paiement accepté"){
                var message = {deliveryID:deliveryID};
                this.http.post(this.URL_SHIPPING,message)
                .subscribe({
                    next : (response)=> console.debug("[validation] deliveryID:" + deliveryID +" sended to shipping"),
                    error : (error)=> console.error("[validation] "+error),
                });
        }
        else {
            console.log("Paiement refusé")
        }
        return status
    } 

}
