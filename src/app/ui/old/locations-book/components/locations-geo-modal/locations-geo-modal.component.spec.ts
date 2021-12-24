import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsGeoModalComponent } from './locations-geo-modal.component';

describe('LocationsGeoModalComponent', () => {
  let component: LocationsGeoModalComponent;
  let fixture: ComponentFixture<LocationsGeoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsGeoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsGeoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
