import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import {Reaccesspoint} from '@core/models/reaccesspoint';
// @ts-ignore
import {GovernmentProgram, InternetAccessType, Organization, Quality, qualityToString} from '@core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fom-monitoring-wizard',
  templateUrl: './fom-monitoring-wizard.component.html',
  styleUrls: ['./fom-monitoring-wizard.component.scss']
})
export class FomMonitoringWizardComponent implements OnInit {
  @Input() accessPointForEdit: Reaccesspoint;
  @Input() organization: Organization;
  monitoringFormGroup: FormGroup;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) { }

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

}
