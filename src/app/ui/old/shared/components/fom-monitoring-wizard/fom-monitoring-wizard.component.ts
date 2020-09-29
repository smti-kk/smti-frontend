import {Component, Input, NgModuleRef, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Organization} from '../../../core/models';
// @ts-ignore
import {OrganizationsService} from '../../../core/services';
import {FormBuilder, Validators} from '@angular/forms';
import {Reaccesspoint} from '../../../core/models/reaccesspoint';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-fom-monitoring-wizard',
  templateUrl: './fom-monitoring-wizard.component.html',
  styleUrls: ['./fom-monitoring-wizard.component.scss']
})
// tslint:disable:variable-name
export class FomMonitoringWizardComponent implements OnInit {
  @Input() accessPointForEdit: Reaccesspoint;
  @Input() organization: Organization;
  monitoringFormGroupUTM: FormGroup;
  monitoringFormGroupZabbix: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private serviceOrganizations: OrganizationsService,
    private _snackBar: MatSnackBar,
    private modalRef: NzModalRef,
  ) {
  }

  ngOnInit(): void {
    this.monitoringFormGroupUTM = this._formBuilder.group({
      networks: ['', Validators.required],
    });

    this.monitoringFormGroupZabbix = this._formBuilder.group({
      // dHostName: '',
      device: this._formBuilder.group({
        hostName: ['', Validators.required],
        ip: ['', Validators.required],
        groupid: '34',
        tag: 'project',
        tagValue: 'telecom-it',
        templateid: '10233',
        macro: '{$SNMP_COMMUNITY}',
        macroValue: 'ESPD_monitor'
      }),
      sensor: this._formBuilder.group({
        hostName: ['', Validators.required],
        ip: ['', Validators.required],
        groupid: '34',
        tag: 'project',
        tagValue: 'telecom-it',
        templateid: '10233',
        macro: '{$SNMP_COMMUNITY}',
        macroValue: 'ESPD_monitor'
      })
    });
    this.monitoringFormGroupZabbix.get('sensor').disable();
  }

  goForMonitoring(): void {
    this.serviceOrganizations
      // .initMonitoring(Object.assign(this.accessPointForEdit, this.monitoringFormGroup.value))
      .initMonitoring(
        this.accessPointForEdit.id,
        this.organization.id,
        this.joinForms(this.monitoringFormGroupUTM.value, this.monitoringFormGroupZabbix.value)
      )
      .subscribe(
        (data: any) => {
          const bar = this._snackBar.open(data.message + ': ' + data.errors, 'Ок');
          bar.afterDismissed().subscribe(
            () => {
              window.location.reload();
            },
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error => {
          this._snackBar.open(error.error.error, 'Ок');
        },
      );
  }

  sensorInit(checked: boolean): void {
    if (checked) {
      this.monitoringFormGroupZabbix.get('sensor').enable();
    } else {
      this.monitoringFormGroupZabbix.get('sensor').disable();
    }
  }

  joinForms(foo, bar): any {
    return Object.assign(foo, bar);
  }
}
