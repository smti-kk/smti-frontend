import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcMobileComponent } from './import-tc-mobile.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcMobileComponent;
  let fixture: ComponentFixture<ImportTcMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
