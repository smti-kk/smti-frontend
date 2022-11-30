import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsPageDesktop } from './locations-page-desktop';

describe('LocationsPageComponent', () => {
  let component: LocationsPageDesktop;
  let fixture: ComponentFixture<LocationsPageDesktop>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsPageDesktop ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsPageDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
