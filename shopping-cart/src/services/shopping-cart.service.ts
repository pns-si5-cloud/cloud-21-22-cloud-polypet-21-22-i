import { Injectable } from '@nestjs/common';
import { Cart } from '../models/Cart';
import { Item } from '../models/Item';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environment';

@Injectable()
export class ShoppingCartService {
  private URL_CATALOG: string;

  constructor(
    private http: HttpService,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {
    this.URL_CATALOG = environment.catalog.URL_VERIFY_PRODUCT;
  }

  async getShoppingCart(cartID: string) {
    const cart = await this.cartRepository.findOne({
      where: { cartID: cartID },
    });
    if (cart == undefined) return undefined;
    const items = await this.itemRepository.find({
      where: { cart: cart },
    });
    const message: {
      cartID: string;
      clientID: string;
      items: {
        item: { productID: string; quantity: number };
      }[];
    } = { cartID: cart.cartID, clientID: cart.clientID, items: [] };
    for (const item of items) {
      message.items.push({
        item: { productID: item.productID, quantity: item.quantity },
      });
      await this.itemRepository.remove(item);
    }
    await this.cartRepository.remove(cart);
    return message;
  }

  async addProduct(clientID: string, productID: string, quantity: number) {
    let cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    let item;
    if (cart != undefined) {
      item = await this.itemRepository.findOne({
        where: { productID: productID, cart: cart.cartID },
      });
      if (item != undefined) {
        item.quantity += +quantity;
        cart.totalPrice += +quantity * item.productPrice;
      } else {
        item = await this.createItem(productID, quantity);
        if (item == undefined) {
          return false;
        }
        item.cart = cart;
        cart.totalPrice += item.quantity * item.productPrice;
      }
    } else {
      item = await this.createItem(productID, quantity);
      if (item == undefined) {
        return false;
      }
      cart = new Cart();
      cart.clientID = clientID;
      cart.totalPrice = item.quantity * item.productPrice;
      cart.lastModifDate = new Date();
      cart.items = [item];
    }
    await this.itemRepository.save(item);
    await this.cartRepository.save(cart);
    return true;
  }

  async validateShoppingCart(clientID: string) {
    const cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    if (cart == undefined) return undefined;
    return cart.cartID;
  }

  async getShoppingCartByClientId(clientID: string) {
    const cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    if (cart == undefined) return undefined;
    const items = await this.itemRepository.find({
      where: { cart: cart },
    });
    const message: {
      cartID: string;
      clientID: string;
      totalPrice: number;
      items: {
        item: { productID: string; quantity: number; price: number };
      }[];
    } = {
      cartID: cart.cartID,
      clientID: cart.clientID,
      totalPrice: cart.totalPrice,
      items: [],
    };
    items.forEach((item) => {
      message.items.push({
        item: {
          productID: item.productID,
          quantity: item.quantity,
          price: item.productPrice,
        },
      });
    });
    return message;
  }

  async createItem(productID: string, quantity: number) {
    try {
      const product = await firstValueFrom(
        this.http.get(this.URL_CATALOG, { params: { productID: productID } }),
      );
      const item = new Item();
      item.productID = productID;
      item.quantity = +quantity;
      item.productPrice = +product.data.productPrice;
      item.productName = product.data.productName;
      return item;
    } catch (error) {
      return undefined;
    }
  }
}
