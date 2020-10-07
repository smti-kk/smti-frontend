import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {FormBuilder, Validators} from '@angular/forms';
import {ORGANIZATION_REPORT_MONITORING_AVAILABILITY, ORGANIZATION_REPORT_MONITORING_TECH} from '@core/constants/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-report-monitoring',
  templateUrl: './report-monitoring.component.html',
  styleUrls: ['./report-monitoring.component.scss']
})
export class ReportMonitoringComponent implements OnInit {
  protected params: HttpParams = new HttpParams();
  reportMapsTechFG: FormGroup;
  reportMapsAvailabilityFG: FormGroup;
  reportMapsUnavailabilityFG: FormGroup;

  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private serviceOrganizations: OrganizationsService,
  ) {
  }

  ngOnInit(): void {
    this.reportMapsTechFG = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
    this.reportMapsAvailabilityFG = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
    this.reportMapsUnavailabilityFG = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }

  getMAPTech(): void {
    this.serviceOrganizations.reportMonitoringTech(
      new Date(this.reportMapsTechFG.get('start').value).getTime() / 1000,
      new Date(this.reportMapsTechFG.get('end').value).getTime() / 1000
    );
  }

  getMAPAvailability(): void {
    this.serviceOrganizations.reportMonitoringAvailability(
      new Date(this.reportMapsAvailabilityFG.get('start').value).getTime() / 1000,
      new Date(this.reportMapsAvailabilityFG.get('end').value).getTime() / 1000
    );
  }

  getMAPUnavailability(): void {
    this.serviceOrganizations.reportMonitoringUnavailability(
      new Date(this.reportMapsUnavailabilityFG.get('start').value).getTime() / 1000,
      new Date(this.reportMapsUnavailabilityFG.get('end').value).getTime() / 1000
    );
  }
}
