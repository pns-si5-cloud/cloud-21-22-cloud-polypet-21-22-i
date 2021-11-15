import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPartnerComponent } from './panel-partner.component';

describe('PanelPartnerComponent', () => {
  let component: PanelPartnerComponent;
  let fixture: ComponentFixture<PanelPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
