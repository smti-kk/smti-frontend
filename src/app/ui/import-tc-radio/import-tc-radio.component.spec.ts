import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcRadioComponent } from './import-tc-radio.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcRadioComponent;
  let fixture: ComponentFixture<ImportTcRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
