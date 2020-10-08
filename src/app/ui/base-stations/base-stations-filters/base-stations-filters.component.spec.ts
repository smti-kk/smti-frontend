import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStationsFiltersComponent } from './base-stations-filters.component';

describe('LocationComparingFiltersComponent', () => {
  let component: BaseStationsFiltersComponent;
  let fixture: ComponentFixture<BaseStationsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseStationsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseStationsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
