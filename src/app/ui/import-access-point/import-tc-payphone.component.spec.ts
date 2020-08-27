import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAccessPointComponent } from './import-access-point.component';

describe('ImportLocationsComponent', () => {
  let component: ImportAccessPointComponent;
  let fixture: ComponentFixture<ImportAccessPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAccessPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAccessPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
