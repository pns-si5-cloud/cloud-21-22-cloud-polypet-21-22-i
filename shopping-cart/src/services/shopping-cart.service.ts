import { Injectable } from '@nestjs/common';
import { Cart } from '../models/Cart';
import { Item } from '../models/Item';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  private URL_CATALOG: string;

  constructor(
    private http: HttpService,
    @InjectRepository(Cart)
    @InjectRepository(Item)
    private cartRepository: Repository<Cart>,
  ) {
    this.URL_CATALOG = 'http://localhost:3003/catalog/verify-product';
  }

  async getShoppingCart(cartID: string) {
    return await this.cartRepository.findOne({ where: { cartID: cartID } });
  }

  async addProduct(clientID: string, productID: string, quantity: number) {
    let cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    // il existe deja un cart pour ce client
    if (cart != undefined) {
      let found = false;
      // on regarde si des exemplaires du produits sont deja dans le cart
      for (const item of cart.items) {
        if (item.productID == productID) {
          item.quantity += +quantity;
          found = true;
          break;
        }
      }
      // si on en a pas trouvé, on l'ajoute
      if (!found) {
        const item = await this.createItem(productID, quantity);
        cart.items.push(item);
        cart.totalPrice += item.quantity * item.productPrice;
      }
    }
    // il n'existe pas de cart pour ce client
    else {
      const item = await this.createItem(productID, quantity);
      const items = [];
      items.push(item);
      cart = new Cart(
        clientID,
        item.quantity * item.productPrice,
        new Date(),
        items,
      );
    }
    await this.cartRepository.save(cart);
  }

  async validateShoppingCart(clientID: string) {
    return await this.cartRepository.findOne({ where: { clientID: clientID } });
  }

  private async createItem(productID: string, quantity: number) {
    const product = await firstValueFrom(
      this.http.get(this.URL_CATALOG, { params: { productID: productID } }),
    );
    const item = new Item(
      productID,
      +quantity,
      +product.data.productPrice,
      product.data.productName,
    );
    return item;
  }
}
