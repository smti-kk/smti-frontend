import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcInternetComponent } from './import-tc-internet.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcInternetComponent;
  let fixture: ComponentFixture<ImportTcInternetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcInternetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
