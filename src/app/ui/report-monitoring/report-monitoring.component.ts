import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '@core/services';
import {FormBuilder, Validators} from '@angular/forms';
import {ORGANIZATION_REPORT_MONITORING} from '@core/constants/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-report-monitoring',
  templateUrl: './report-monitoring.component.html',
  styleUrls: ['./report-monitoring.component.scss']
})
export class ReportMonitoringComponent implements OnInit {
  protected params: HttpParams = new HttpParams();
  reportMapsFG: FormGroup;

  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private serviceOrganizations: OrganizationsService,
  ) {
  }

  ngOnInit(): void {
    this.reportMapsFG = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }

  goForMonitoring(): void {
    this.serviceOrganizations.reportMonitoring2(
      new Date(this.reportMapsFG.get('start').value).getTime() / 1000,
      new Date(this.reportMapsFG.get('end').value).getTime() / 1000
    );
  }

  exportExcel() {
    this.params.set('start', (new Date(this.reportMapsFG.get('start').value).getTime() / 1000).toString()).set('end', (new Date(this.reportMapsFG.get('end').value).getTime() / 1000).toString());
    window.location.href = `${ORGANIZATION_REPORT_MONITORING}?${this.params.toString()}`;
  }
}
