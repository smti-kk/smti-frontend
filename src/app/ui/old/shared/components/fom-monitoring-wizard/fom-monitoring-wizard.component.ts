import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Organization} from '../../../core/models';
// @ts-ignore
import {OrganizationsService} from '../../../core/services';
import {FormBuilder, Validators} from '@angular/forms';
import {Reaccesspoint} from '../../../core/models/reaccesspoint';

@Component({
  selector: 'app-fom-monitoring-wizard',
  templateUrl: './fom-monitoring-wizard.component.html',
  styleUrls: ['./fom-monitoring-wizard.component.scss']
})
export class FomMonitoringWizardComponent implements OnInit {
  @Input() accessPointForEdit: Reaccesspoint;
  @Input() organization: Organization;
  monitoringFormGroup: FormGroup;

  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private serviceOrganizations: OrganizationsService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.monitoringFormGroup = this._formBuilder.group({
      networks: ['', Validators.required],
      dHostName: '',
      device: this._formBuilder.group({
        hostName: '',
        ip: '',
        groupid: '34',
        tag: 'project',
        tagValue: 'telecom-it',
        templateid: '10233',
        macro: '{$SNMP_COMMUNITY}',
        macroValue: 'ESPD_monitor'
      }),
      sensor: this._formBuilder.group({
        hostName: '',
        ip: '',
        groupid: '34',
        tag: 'project',
        tagValue: 'telecom-it',
        templateid: '10233',
        macro: '{$SNMP_COMMUNITY}',
        macroValue: 'ESPD_monitor'
      })
    });

  }

  goForMonitoring(): void {
    this.serviceOrganizations
      // .initMonitoring(Object.assign(this.accessPointForEdit, this.monitoringFormGroup.value))
      .initMonitoring(this.accessPointForEdit.id, this.organization.id, this.monitoringFormGroup.value)
      .subscribe(
        () => {
          this._snackBar.open('Добавленно в системы мониторинга', '', {
            duration: 15 * 1000,
          });
          window.location.reload();
          // todo: implement me
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error => {
          // todo: implement me
          this._snackBar.open(error.error.error, '', {
            duration: 15 * 1000,
          });
          // throw Error(`${error}`);
        },
      );
  }

}
