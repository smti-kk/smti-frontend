import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTablePageComponentComponent } from './pivot-table-page-component';

describe('PivotTablePageComponentComponent', () => {
  let component: PivotTablePageComponentComponent;
  let fixture: ComponentFixture<PivotTablePageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotTablePageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotTablePageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
