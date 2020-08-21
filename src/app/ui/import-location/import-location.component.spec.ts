import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLocationComponent } from './import-location.component';

describe('ImportLocationsComponent', () => {
  let component: ImportLocationComponent;
  let fixture: ComponentFixture<ImportLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
