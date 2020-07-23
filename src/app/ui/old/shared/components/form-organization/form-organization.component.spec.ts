import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrganizationComponent } from './form-organization.component';

describe('FormOrganizationComponent', () => {
  let component: FormOrganizationComponent;
  let fixture: ComponentFixture<FormOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
