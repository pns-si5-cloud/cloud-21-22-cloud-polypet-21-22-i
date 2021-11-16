import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductRequestFormComponent } from './add-product-request-form.component';

describe('AddProductRequestFormComponent', () => {
  let component: AddProductRequestFormComponent;
  let fixture: ComponentFixture<AddProductRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
