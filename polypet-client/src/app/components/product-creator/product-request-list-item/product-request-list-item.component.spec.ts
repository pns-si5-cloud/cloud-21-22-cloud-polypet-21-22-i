import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestListItemComponent } from './product-request-list-item.component';

describe('ProductRequestListItemComponent', () => {
  let component: ProductRequestListItemComponent;
  let fixture: ComponentFixture<ProductRequestListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRequestListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
