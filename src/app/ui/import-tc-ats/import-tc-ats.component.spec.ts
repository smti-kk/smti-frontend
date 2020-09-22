import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcAtsComponent } from './import-tc-ats.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcAtsComponent;
  let fixture: ComponentFixture<ImportTcAtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcAtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcAtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
