import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcInfomatComponent } from './import-tc-infomat.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcInfomatComponent;
  let fixture: ComponentFixture<ImportTcInfomatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcInfomatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcInfomatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
