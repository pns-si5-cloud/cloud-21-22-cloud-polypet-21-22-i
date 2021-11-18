import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemListComponent } from './shopping-cart-item-list.component';

describe('ShoppingCartListComponent', () => {
  let component: ShoppingCartItemListComponent;
  let fixture: ComponentFixture<ShoppingCartItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
