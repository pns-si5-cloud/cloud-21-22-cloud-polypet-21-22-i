import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAddCartComponent } from './bank-add-cart.component';

describe('BankAddCartComponent', () => {
  let component: BankAddCartComponent;
  let fixture: ComponentFixture<BankAddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAddCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
