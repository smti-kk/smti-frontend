import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsBookFilterComponent } from './locations-book-filter.component';

describe('LocationsBookFilterComponent', () => {
  let component: LocationsBookFilterComponent;
  let fixture: ComponentFixture<LocationsBookFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsBookFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsBookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
