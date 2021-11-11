import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CatalogService } from 'src/services/catalog.service';
import { Repository } from 'typeorm';
import { Product } from 'src/models/product';

describe('Catalog', () => {
  let catalogService: CatalogService;
  let repositoryMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(Repository).useValue(repositoryMock).compile();

    catalogService = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(catalogService).toBeDefined();
  });

});
