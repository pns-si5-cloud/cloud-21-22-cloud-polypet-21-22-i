import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Post('product')
  async addProduct(
    @Body('clientID') clientID: string,
    @Body('productID') productID: string,
    @Body('quantity') quantity: number,
  ) {
    console.log('receiving product : ', productID);
    console.log('clientID : ', clientID);
    if (
      !(await this.shoppingCartService.addProduct(
        clientID,
        productID,
        quantity,
      ))
    ) {
      throw new BadRequestException('product does not exist in catalog');
    }
  }

  @Get('validate')
  async validateShoppingCart(@Query('clientID') clientID: string) {
    const msg = await this.shoppingCartService.validateShoppingCart(clientID);
    if (msg != undefined) {
      return msg;
    }
    throw new BadRequestException('undefined shopping cart');
  }

  @Get('cart')
  async getShoppingCartByClientID(@Query('clientID') clientID: string) {
    console.log('clientID : ', clientID);
    const msg = await this.shoppingCartService.getShoppingCartByClientId(
      clientID,
    );
    if (msg != undefined) {
      return msg;
    }
    throw new BadRequestException('undefined shopping cart');
  }

  @Get()
  async getShoppingCart(@Query('cartID') cartID: string) {
    const msg = await this.shoppingCartService.getShoppingCart(cartID);
    if (msg != undefined) {
      return msg;
    }
    throw new BadRequestException('undefined shopping cart');
  }

  @Get('delete')
  async deleteShoppingCart(@Query('clientID') clientID: string) {
    console.log('called delete with' + clientID);
    if (!(await this.shoppingCartService.deleteShoppingCart(clientID))) {
      throw new BadRequestException('undefined shopping cart');
    }
    return 'deleted';
  }
}
