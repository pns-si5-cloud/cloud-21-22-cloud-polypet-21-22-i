import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestViewComponent } from './product-request-view.component';

describe('ProductRequestViewComponent', () => {
  let component: ProductRequestViewComponent;
  let fixture: ComponentFixture<ProductRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
