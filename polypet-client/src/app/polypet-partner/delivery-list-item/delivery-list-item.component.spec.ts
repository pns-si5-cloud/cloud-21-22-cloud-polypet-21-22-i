import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryListItemComponent } from './delivery-list-item.component';

describe('DeliveryListItemComponent', () => {
  let component: DeliveryListItemComponent;
  let fixture: ComponentFixture<DeliveryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
