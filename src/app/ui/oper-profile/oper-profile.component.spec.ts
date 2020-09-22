import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperProfileComponent } from './oper-profile.component';

describe('OperProfileComponent', () => {
  let component: OperProfileComponent;
  let fixture: ComponentFixture<OperProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
