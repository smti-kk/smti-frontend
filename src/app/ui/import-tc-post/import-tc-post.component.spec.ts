import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTcPostComponent } from './import-tc-post.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTcPostComponent;
  let fixture: ComponentFixture<ImportTcPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTcPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTcPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
