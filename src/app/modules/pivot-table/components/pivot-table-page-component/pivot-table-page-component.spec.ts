import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTablePageComponent } from './pivot-table-page-component';

describe('PivotTablePageComponentComponent', () => {
  let component: PivotTablePageComponent;
  let fixture: ComponentFixture<PivotTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
