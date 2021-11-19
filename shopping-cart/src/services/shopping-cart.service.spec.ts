import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCartService } from './shopping-cart.service';
import { Cart } from '../models/Cart';
import { Item } from '../models/Item';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    remove: jest.fn((entity) => entity),
  }),
);

describe('Catalog Service', () => {
  const httpMock = {};
  let shoppingCartService: ShoppingCartService;
  let repositoryMockItem: MockType<Repository<Item>>;
  let repositoryMockCart: MockType<Repository<Cart>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ShoppingCartService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(Item),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Cart),
          useFactory: repositoryMockFactory,
        },
      ],
    })
      .overrideProvider(HttpService)
      .useValue(httpMock)
      .compile();
    shoppingCartService = module.get<ShoppingCartService>(ShoppingCartService);
    repositoryMockItem = module.get(getRepositoryToken(Item));
    repositoryMockCart = module.get(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(shoppingCartService).toBeDefined();
  });

  it('creating an item with a response from catalog', async () => {
    const result: AxiosResponse = {
      data: {
        productID: 'productID',
        productPrice: 10,
        productName: 'testProduct',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    const mockGet = jest.fn((...args) => of(result));
    httpMock['get'] = mockGet;
    const item = await shoppingCartService.createItem('productID', 2);
    expect(item.productID).toEqual('productID');
    expect(item.quantity).toEqual(2);
    expect(item.productPrice).toEqual(10);
    expect(item.productName).toEqual('testProduct');
  });

  it('new clientID so it creates cart and item in db', async () => {
    const result: AxiosResponse = {
      data: {
        productID: 'productID',
        productPrice: 10,
        productName: 'testProduct',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    const mockGet = jest.fn((...args) => of(result));
    httpMock['get'] = mockGet;
    repositoryMockCart.findOne.mockReturnValue(undefined);
    await shoppingCartService.addProduct('clientID', 'productID', 2);
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
    expect(repositoryMockCart.save).toHaveBeenCalledTimes(1);
    expect(repositoryMockItem.save).toHaveBeenCalledTimes(1);
  });

  it('same item so it saves updated item and updated cart', async () => {
    const result: AxiosResponse = {
      data: {
        productID: 'productID',
        productPrice: 10,
        productName: 'testProduct',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    const mockGet = jest.fn((...args) => of(result));
    httpMock['get'] = mockGet;
    repositoryMockCart.findOne.mockReturnValue({
      cartID: 'cartID',
      totalPrice: 20,
    });
    repositoryMockItem.findOne.mockReturnValue({
      productID: 'productID',
      quantity: 2,
      productPrice: 10,
    });
    await shoppingCartService.addProduct('clientID', 'productID', 2);
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
    expect(repositoryMockItem.findOne).toHaveBeenCalledWith({
      where: { productID: 'productID', cart: 'cartID' },
    });
    expect(repositoryMockCart.save).toHaveBeenCalledTimes(1);
    expect(repositoryMockCart.save).toHaveBeenCalledWith({
      cartID: 'cartID',
      totalPrice: 40,
    });
    expect(repositoryMockItem.save).toHaveBeenCalledTimes(1);
    expect(repositoryMockItem.save).toHaveBeenCalledWith({
      productID: 'productID',
      quantity: 4,
      productPrice: 10,
    });
  });

  it('new item so saves new item in db and saves updated cart', async () => {
    const result: AxiosResponse = {
      data: {
        productID: 'productID2',
        productPrice: 20,
        productName: 'testProduct',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    const mockGet = jest.fn((...args) => of(result));
    httpMock['get'] = mockGet;
    repositoryMockCart.findOne.mockReturnValue({
      cartID: 'cartID',
      totalPrice: 20,
    });
    repositoryMockItem.findOne.mockReturnValue(undefined);
    await shoppingCartService.addProduct('clientID', 'productID2', 3);
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
    expect(repositoryMockItem.findOne).toHaveBeenCalledWith({
      where: { productID: 'productID2', cart: 'cartID' },
    });
    expect(repositoryMockCart.save).toHaveBeenCalledTimes(1);
    expect(repositoryMockCart.save).toHaveBeenCalledWith({
      cartID: 'cartID',
      totalPrice: 80,
    });
    expect(repositoryMockItem.save).toHaveBeenCalledTimes(1);
  });

  it('find cart to validate and return id', async () => {
    repositoryMockCart.findOne.mockReturnValue({ cartID: 'cartID' });
    expect(
      (await shoppingCartService.validateShoppingCart('clientID')) == 'cartID',
    );
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
  });

  it("find cart for client who doesn't have one to validate and return id", async () => {
    repositoryMockCart.findOne.mockReturnValue(undefined);
    expect(
      (await shoppingCartService.validateShoppingCart('clientID')) == undefined,
    );
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
  });

  it('find cart by client id undefined', async () => {
    repositoryMockCart.findOne.mockReturnValue(undefined);
    expect(
      (await shoppingCartService.getShoppingCartByClientId('clientID')) ==
        undefined,
    );
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
  });

  it('find cart by cart id undefined', async () => {
    repositoryMockCart.findOne.mockReturnValue(undefined);
    expect((await shoppingCartService.getShoppingCart('cartID')) == undefined);
    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { cartID: 'cartID' },
    });
  });

  it('find cart by client id', async () => {
    repositoryMockCart.findOne.mockReturnValue({
      cartID: 'cartID',
      clientID: 'clientID',
      totalPrice: 20,
    });
    repositoryMockItem.find.mockReturnValue([
      { productID: 'productID', quantity: 2 },
    ]);

    const cart = await shoppingCartService.getShoppingCartByClientId(
      'clientID',
    );

    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { clientID: 'clientID' },
    });
    expect(repositoryMockItem.find).toHaveBeenCalledWith({
      where: {
        cart: {
          cartID: 'cartID',
          clientID: 'clientID',
          totalPrice: 20,
        },
      },
    });
    expect(cart.cartID).toEqual('cartID');
    expect(cart.clientID).toEqual('clientID');
    expect(cart.totalPrice).toEqual(20);
    expect(cart.items.length).toEqual(1);
    expect(cart.items[0].item.productID).toEqual('productID');
    expect(cart.items[0].item.quantity).toEqual(2);
  });

  it('find by cart id', async () => {
    repositoryMockCart.findOne.mockReturnValue({
      cartID: 'cartID',
      clientID: 'clientID',
    });
    repositoryMockItem.find.mockReturnValue([
      { productID: 'productID', quantity: 2 },
    ]);

    const cart = await shoppingCartService.getShoppingCart('cartID');

    expect(repositoryMockCart.findOne).toHaveBeenCalledWith({
      where: { cartID: 'cartID' },
    });
    expect(repositoryMockItem.find).toHaveBeenCalledWith({
      where: {
        cart: {
          cartID: 'cartID',
          clientID: 'clientID',
        },
      },
    });
    /*expect(repositoryMockCart.remove).toHaveBeenCalledWith({
      cartID: 'cartID',
      clientID: 'clientID',
    });
    expect(repositoryMockItem.remove).toHaveBeenCalledWith({
      productID: 'productID',
      quantity: 2,
    });*/
    expect(cart.cartID).toEqual('cartID');
    expect(cart.clientID).toEqual('clientID');
    expect(cart.items.length).toEqual(1);
    expect(cart.items[0].item.productID).toEqual('productID');
    expect(cart.items[0].item.quantity).toEqual(2);
  });
});
