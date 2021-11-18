import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestListComponent } from './product-request-list.component';

describe('ProductRequestListComponent', () => {
  let component: ProductRequestListComponent;
  let fixture: ComponentFixture<ProductRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
