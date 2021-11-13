import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from 'src/models/product';
import { ProductDTO } from 'src/dto/product-dto';
import { CatalogService } from 'src/services/catalog.service';
import { Repository } from 'typeorm';
import { ShoppingCartProduct } from 'src/dto/shopping-cart-product-dto';
import { NonDetailedProduct } from 'src/dto/non-detailed-product-dto';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
  }));

describe('Catalog Service', () => {
  let catalogService: CatalogService;
  let repositoryMock: MockType<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            CatalogService,
            // Provide your mock instead of the actual repository
            { provide: getRepositoryToken(Product), useFactory: repositoryMockFactory },
        ],
      }).compile();
      catalogService = module.get<CatalogService>(CatalogService);
      repositoryMock = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(catalogService).toBeDefined();
  });

  it('should add product to database', ()=> {
    const productDTO = new ProductDTO("test",5.2,"Chat","Description de pâté","partner_test_id","saumon","1x1x1");
    catalogService.addProductToCatalog(productDTO);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('should find a detailed product', async ()=> {
    const productDTO = new ProductDTO("test",5.2,"Chat","Description de pâté","partner_test_id","saumon","1x1x1");
    const product = Product.createProductFromProductDTO(productDTO);
    product.product_id = "product_test_id";
    product.addedDate = new Date();

    repositoryMock.findOne.mockReturnValue(product);

    expect(await catalogService.getDetailedProduct(product.product_id)).toEqual(product);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({where:{product_id:product.product_id}});
  });

  it('should verify non-existing product and return undefined', async ()=> {
    var productID = "product_test_id"
    repositoryMock.findOne.mockReturnValue(undefined);

    expect(await catalogService.verifyAndReturnCartProduct(productID)).toEqual(undefined);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({where:{product_id:productID}});
  });

  it('should verify existing product and return cart product', async ()=> {
    const productDTO = new ProductDTO("test",5.2,"Chat","Description de pâté","partner_test_id","saumon","1x1x1");
    const product = Product.createProductFromProductDTO(productDTO);
    product.product_id = "product_test_id";
    product.addedDate = new Date();

    const cartProduct = new ShoppingCartProduct(product.product_id,product.name, product.price);
    repositoryMock.findOne.mockReturnValue(product);

    expect(await catalogService.verifyAndReturnCartProduct(product.product_id)).toEqual(cartProduct);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({where:{product_id:product.product_id}});
  });

  it('should return recent product', async ()=> {
    const productDTO = new ProductDTO("test",5.2,"Chat","Description de pâté","partner_test_id","saumon","1x1x1");
    
    const recentProduct = Product.createProductFromProductDTO(productDTO);
    recentProduct.product_id = "recent_product_test_id";
    recentProduct.addedDate = new Date();
    
    repositoryMock.find.mockReturnValue([recentProduct]);

    expect(await catalogService.getLatestProducts()).toEqual([recentProduct]);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should return all non detailed product', async ()=> {
    const productDTO = new ProductDTO("test",5.2,"Chat","Description de pâté","partner_test_id","saumon","1x1x1");
    
    const product1 = Product.createProductFromProductDTO(productDTO);
    product1.product_id = "product_test_id1";
    product1.addedDate = new Date();

    const product2 = Product.createProductFromProductDTO(productDTO);
    product2.product_id = "product_test_id2";
    product2.addedDate = new Date();

    const product3 = Product.createProductFromProductDTO(productDTO);
    product3.product_id = "product_test_id3";
    product3.addedDate = new Date();
    
    repositoryMock.find.mockReturnValue([product1,product2,product3]);

    const ndProd1 = new NonDetailedProduct(product1.product_id,product1.name,product1.description);
    const ndProd2 = new NonDetailedProduct(product2.product_id,product2.name,product2.description);
    const ndProd3 = new NonDetailedProduct(product3.product_id,product3.name,product3.description);

    expect(await catalogService.getAllNonDetailedProducts()).toEqual([ndProd1,ndProd2,ndProd3]);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });
});
