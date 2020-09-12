import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMonitoringComponent } from './report-monitoring.component';

describe('ReportMonitoringComponent', () => {
  let component: ReportMonitoringComponent;
  let fixture: ComponentFixture<ReportMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
