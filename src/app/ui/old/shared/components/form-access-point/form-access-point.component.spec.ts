import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccessPointComponent } from './form-access-point.component';

describe('FormAccessPointComponent', () => {
  let component: FormAccessPointComponent;
  let fixture: ComponentFixture<FormAccessPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAccessPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAccessPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
