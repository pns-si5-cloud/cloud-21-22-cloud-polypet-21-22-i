import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotDetailedProduct } from '../classes/not-detailed-product';
import { Product } from '../classes/product';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getAllProductNotDetails():Promise<NotDetailedProduct[]>{
    return firstValueFrom(this.http.get<NotDetailedProduct[]>(environment.catalog_url.CATALOG_GET_ALL_PRODUCT))
  }

  getProductDetail(productID:any):Promise<Product>{
    return firstValueFrom(this.http.get<Product>(environment.catalog_url.CATALOG_GET_PRODUCT_DETAIL,{params:{productID}}).pipe(map((data: object)=>Object.setPrototypeOf(data, Product.prototype)
    )))
  }
}
