import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComparingFiltersComponent } from './location-comparing-filters.component';

describe('LocationComparingFiltersComponent', () => {
  let component: LocationComparingFiltersComponent;
  let fixture: ComponentFixture<LocationComparingFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationComparingFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComparingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
