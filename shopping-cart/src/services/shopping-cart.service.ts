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
    private cartRepository: Repository<Cart>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {
    this.URL_CATALOG = 'http://catalog:3003/catalog/verify-product';
  }

  async getShoppingCart(cartID: string) {
    const cart = await this.cartRepository.findOne({
      where: { cartID: cartID },
    });
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
    items.forEach((item) => {
      message.items.push({
        item: { productID: item.productID, quantity: item.quantity },
      });
    });
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
        await this.itemRepository.save(item);
      } else {
        item = await this.createItem(productID, quantity);
        item.cart = cart;
        cart.totalPrice += item.quantity * item.productPrice;
      }
    } else {
      item = await this.createItem(productID, quantity);
      cart = new Cart();
      cart.clientID = clientID;
      cart.totalPrice = item.quantity * item.productPrice;
      cart.lastModifDate = new Date();
      cart.items = [item];
    }
    await this.itemRepository.save(item);
    await this.cartRepository.save(cart);
  }

  async validateShoppingCart(clientID: string) {
    const cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    return cart.cartID;
  }

  async getShoppingCartByClientId(clientID: string) {
    const cart = await this.cartRepository.findOne({
      where: { clientID: clientID },
    });
    const items = await this.itemRepository.find({
      where: { cart: cart },
    });
    const message: {
      cartID: string;
      clientID: string;
      totalPrice: number;
      items: {
        item: { productID: string; quatity: number };
      }[];
    } = {
      cartID: cart.cartID,
      clientID: cart.clientID,
      totalPrice: cart.totalPrice,
      items: [],
    };
    items.forEach((item) => {
      message.items.push({
        item: { productID: item.productID, quatity: item.quantity },
      });
    });
    return message;
  }

  private async createItem(productID: string, quantity: number) {
    const product = await firstValueFrom(
      this.http.get(this.URL_CATALOG, { params: { productID: productID } }),
    );
    const item = new Item();
    item.productID = productID;
    item.quantity = +quantity;
    item.productPrice = +product.data.productPrice;
    item.productName = product.data.productName;
    return item;
  }
}
