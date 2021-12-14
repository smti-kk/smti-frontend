import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditLocationComponent } from './form-edit-location.component';

describe('FormEditLocationComponent', () => {
  let component: FormEditLocationComponent;
  let fixture: ComponentFixture<FormEditLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
