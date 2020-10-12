import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResetPasswordComponent } from './form-reset-password.component';

describe('FormResetPasswordComponent', () => {
  let component: FormResetPasswordComponent;
  let fixture: ComponentFixture<FormResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
