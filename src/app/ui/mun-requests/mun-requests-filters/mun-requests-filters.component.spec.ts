import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunRequestsFiltersComponent } from './mun-requests-filters.component';

describe('MunRequestsFiltersComponent', () => {
  let component: MunRequestsFiltersComponent;
  let fixture: ComponentFixture<MunRequestsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunRequestsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunRequestsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
