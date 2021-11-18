import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemListItemComponent } from './shopping-cart-item-list-item.component';

describe('ShoppingCartItemListItemComponent', () => {
  let component: ShoppingCartItemListItemComponent;
  let fixture: ComponentFixture<ShoppingCartItemListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
