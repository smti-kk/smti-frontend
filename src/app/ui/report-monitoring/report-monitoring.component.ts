import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {FormBuilder, Validators} from '@angular/forms';
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
  isLoading = false;

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
    this.isLoading = true;
    const st = new Date(this.reportMapsTechFG.get('start').value);
    const en = new Date(this.reportMapsTechFG.get('end').value);
    en.setDate(en.getDate() + 1);
    this.serviceOrganizations.reportMonitoringTech(st.getTime() / 1000, en.getTime() / 1000).subscribe(() => {
      this.isLoading = false;
    });
  }

  getMAPAvailability(): void {
    this.isLoading = true;
    const st = new Date(this.reportMapsAvailabilityFG.get('start').value);
    const en = new Date(this.reportMapsAvailabilityFG.get('end').value);
    en.setDate(en.getDate() + 1);
    this.serviceOrganizations.reportMonitoringAvailability(st.getTime() / 1000, en.getTime() / 1000).subscribe(() => {
      this.isLoading = false;
    });
  }

  getMAPUnavailability(): void {
    this.isLoading = true;
    const st = new Date(this.reportMapsUnavailabilityFG.get('start').value);
    const en = new Date(this.reportMapsUnavailabilityFG.get('end').value);
    en.setDate(en.getDate() + 1);
    this.serviceOrganizations.reportMonitoringUnavailability(st.getTime() / 1000, en.getTime() / 1000).subscribe(() => {
      this.isLoading = false;
    });
  }
}
