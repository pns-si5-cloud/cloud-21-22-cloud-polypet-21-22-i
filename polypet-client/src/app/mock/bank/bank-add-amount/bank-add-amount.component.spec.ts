import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAddAmountComponent } from './bank-add-amount.component';

describe('BankAddAmountComponent', () => {
  let component: BankAddAmountComponent;
  let fixture: ComponentFixture<BankAddAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAddAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAddAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
