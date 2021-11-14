import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductCreatorService {

  constructor(private http:HttpClient) {
   }

  addProduct(product:Product){
    this.http.post(environment.product_creator_url.ADD_PRODUCT,{"new-product":product}).subscribe({error:(err)=>alert("Impossible d'ajouter le produit "+product.name)})
  }
}
