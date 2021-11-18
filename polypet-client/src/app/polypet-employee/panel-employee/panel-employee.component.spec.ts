import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEmployeeComponent } from './panel-employee.component';

describe('PanelEmployeeComponent', () => {
  let component: PanelEmployeeComponent;
  let fixture: ComponentFixture<PanelEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
