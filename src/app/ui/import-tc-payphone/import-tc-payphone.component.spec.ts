import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcPayphoneComponent } from './import-tc-payphone.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcPayphoneComponent;
  let fixture: ComponentFixture<ImportTcPayphoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcPayphoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcPayphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
