import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcTvComponent } from './import-tc-tv.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcTvComponent;
  let fixture: ComponentFixture<ImportTcTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
