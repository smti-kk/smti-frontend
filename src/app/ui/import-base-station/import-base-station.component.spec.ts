import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBaseStationComponent } from './import-base-station.component';

describe('ImportLocationsComponent', () => {
  let component: ImportBaseStationComponent;
  let fixture: ComponentFixture<ImportBaseStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBaseStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBaseStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
