import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCapabilitiesSearchComponent } from './location-capabilities-search.component';

describe('LocationCapabilitiesSearchComponent', () => {
  let component: LocationCapabilitiesSearchComponent;
  let fixture: ComponentFixture<LocationCapabilitiesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCapabilitiesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCapabilitiesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
