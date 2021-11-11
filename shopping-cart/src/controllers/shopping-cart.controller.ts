import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Post('product')
  addProduct(
    @Body('clientID') clientID: string,
    @Body('productID') productID: string,
    @Body('quantity') quantity: number,
  ) {
    this.shoppingCartService.addProduct(clientID, productID, quantity);
  }

  @Get('validate')
  async validateShoppingCart(@Query('clientID') clientID: string) {
    return await this.shoppingCartService.validateShoppingCart(clientID);
  }

  @Get('cart')
  async getShoppingCartByClientID(@Query('clientID') clientID: string) {
    return await this.shoppingCartService.getShoppingCartByClientId(clientID);
  }

  @Get()
  async getShoppingCart(@Query('cartID') cartID: string) {
    return await this.shoppingCartService.getShoppingCart(cartID);
  }
}
