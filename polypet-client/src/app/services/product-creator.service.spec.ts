import { TestBed } from '@angular/core/testing';

import { ProductCreatorService } from './product-creator.service';

describe('ProductCreatorService', () => {
  let service: ProductCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
