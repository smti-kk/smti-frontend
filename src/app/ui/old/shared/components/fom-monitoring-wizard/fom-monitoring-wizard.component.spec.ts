import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomMonitoringWizardComponent } from './fom-monitoring-wizard.component';

describe('FomMonitoringWizardComponent', () => {
  let component: FomMonitoringWizardComponent;
  let fixture: ComponentFixture<FomMonitoringWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomMonitoringWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomMonitoringWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
