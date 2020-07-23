import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsPage } from './locations-page';

describe('LocationsPageComponent', () => {
  let component: LocationsPage;
  let fixture: ComponentFixture<LocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
