import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoBar } from './LocationInfoBar';

describe('LocationInfoBarComponent', () => {
  let component: LocationInfoBar;
  let fixture: ComponentFixture<LocationInfoBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInfoBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInfoBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
