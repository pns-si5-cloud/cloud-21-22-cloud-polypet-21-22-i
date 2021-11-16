import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductRequestNonDetailed } from '../classes/not-detailed-product-request';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductCreatorService {

  constructor(private http:HttpClient) {
   }

  addProduct(product:Product){
    this.http.post(environment.product_creator_url.ADD_PRODUCT,{"new-product":product}).subscribe({next:()=>alert("Produit ajouter"),error:(err)=>alert("Impossible d'ajouter le produit "+product.name)})
  }

  addProductRequest(productRequest:Product) {
    this.http.post(environment.product_creator_url.ADD_PRODUCT_REQUEST,{"new-product-request":productRequest}).subscribe({
      next:() => alert("Requête envoyé."),
      error:(err) => alert("Impossible d'envoyer la requête du produit " + productRequest.name)
    })
  }

  getProductRequestDetailed(productID:number) : Promise<Product> {
    return firstValueFrom(this.http.get<Product>(environment.product_creator_url.GET_DETAILED_PRODUCT_REQUEST,{params:{productID}}).pipe(map((data: object)=>Object.setPrototypeOf(data, Product.prototype)
    )))
  }

  getAllProductRequestNotDetailed():Promise<ProductRequestNonDetailed[]>{
    return firstValueFrom(this.http.get<ProductRequestNonDetailed[]>(environment.product_creator_url.GET_ALL_REQUEST))
  }

  validateRequest(request_id:number) {
    this.http.post(environment.product_creator_url.VALIDATE_REQUEST,{request_id}).subscribe({
      next:() => { 
        alert("Requête validée.");
        window.location.reload();
      },
      error:(err) => alert("Impossible d'envoyer la validation du produit " + request_id)
    })
  }
}
