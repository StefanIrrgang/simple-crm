import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCompanyComponent } from './dialog-add-company.component';

describe('DialogAddCompanyComponent', () => {
  let component: DialogAddCompanyComponent;
  let fixture: ComponentFixture<DialogAddCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddCompanyComponent]
    });
    fixture = TestBed.createComponent(DialogAddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
