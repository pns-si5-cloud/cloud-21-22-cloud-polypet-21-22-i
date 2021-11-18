import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map} from "rxjs";
import {ShoppingCart} from "../classes/shopping-cart";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) {
  }


  getShoppingCartByClientID(){
    return firstValueFrom(this.http.get<ShoppingCart>(environment.shopping_cart_url.SHOPPING_CART_GET_BY_CLIENT_ID).pipe(map((data: object)=>ShoppingCart.fromJSON(data))));
  }

  addProduct(idProduct: any, quantity: any) {
    console.log('post :'+environment.shopping_cart_url.SHOPPING_CART_ADD_PRODUCT +' productID: ' + idProduct+ ' quantity : '+ quantity);
    const reqBody = {productID:idProduct,quantity:quantity};
    this.http.post(environment.shopping_cart_url.SHOPPING_CART_ADD_PRODUCT,reqBody).subscribe({
      next:() => alert("Request sent"),
      error:(err) => alert("Unable to send the request of the paymentInformation " + JSON.stringify(reqBody) )
    });
  }
}
