import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDateFormComponent } from './delivery-date-form.component';

describe('DeliveryDateFormComponent', () => {
  let component: DeliveryDateFormComponent;
  let fixture: ComponentFixture<DeliveryDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryDateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
