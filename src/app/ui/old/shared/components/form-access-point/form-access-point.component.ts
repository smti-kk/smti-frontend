import {Component, Input, OnInit} from '@angular/core';
import {compareById} from '@core/utils/compare';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {Observable} from 'rxjs';
import {GovernmentProgram, InternetAccessType, Organization, Quality, qualityToString, participationStatusToString} from '@core/models';
import {AccessPointType} from '@core/models/accesspoint-type';
import {AccessPointService} from '@core/services/accesspoint-type.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ParticipationStatus} from '../../../core/models';

const IP_REGEXP =/^([01]?\d\d?|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])){3}(?:\/[0-2]\d|\/3[0-2])?$/gm;

@Component({
  selector: 'app-form-access-point',
  templateUrl: './form-access-point.component.html',
  styleUrls: ['./form-access-point.component.scss'],
})
// tslint:disable:variable-name
export class FormAccessPointComponent implements OnInit {

  @Input() accessPointForEdit: Reaccesspoint;
  @Input() organization: Organization;
  @Input() mode: 'CREATE' | 'UPDATE';
  @Input() type: string | undefined;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;
  fGovernmentPrograms$: Observable<GovernmentProgram[]>;
  accessPointType$: Observable<AccessPointType[]>;
  formGroupAccessPoints: FormGroup;
  ap: Reaccesspoint;
  Quality = Quality;
  qualityToString = qualityToString;
  compareFn = compareById;
  participationStatusToString: ((status: ParticipationStatus) => string) = participationStatusToString;

  constructor(
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private serviceAccessPointType: AccessPointService,
    private formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    this.accessPointType$ = this.serviceAccessPointType.getAccessPointType();

    if (this.accessPointForEdit) {
      this.buildForm(this.accessPointForEdit);
    } else {
      this.buildForm();
    }
  }

  private buildForm(point?: Reaccesspoint): void {
    this.formGroupAccessPoints = this.formBuilder.group({
      _id: point ? point.id : null,
      _address: [null, Validators.required],
      // _avstatus: null,
      _billingId: null,
      _completed: null,
      _connectionType: [null, Validators.required],
      _organizationId: this.organization.id || null,
      _locationId: this.organization.location.valueOf() || null,
      _contractor: [null],
      // _createdAt: null,
      _customer: null,
      _declaredSpeed: null,
      _description: null,
      _governmentProgram: null,
      _ipConfig: null,
      _maxAmount: null,
      _name: this.organization.name || null,
      _lat: [point ? point.point.lat : null, Validators.required],
      _lng: [point ? point.point.lng : null, Validators.required],
      // _netTrafficLastMonth: null,
      // _netTrafficLastWeek: null,
      _node: null,
      _operator: null,
      _quality: null,
      _state: null,
      _ucn: null,
      // _updatedAt: null,
      _visible: true,
      _type: [null, Validators.required],
      _amount: null,
      _number: null,
      _equipment: null,
      _softType: null,
      //----
      _zspdWhiteIp: [null, Validators.pattern(IP_REGEXP)],
      _contract: null,
      _numIncomingMessage: null,
      _numSourceEmailsRTK: null,
      _monthlyPay: null,
      _oneTimePay: null,
      _espdWhiteIp: [null, Validators.pattern(IP_REGEXP)],
      _contractId: null,
      _availZspdOrMethodConToZspd: null,
      _dataCommissioning: null,
      _commentary: null,
      _contacts: null,
    });

    if (this.type) {
      this.formGroupAccessPoints.get('_type').disable();
      this.formGroupAccessPoints.get('_type').patchValue(this.type);
    }
    if (point) {
      this.formGroupAccessPoints.patchValue(point);
    }
  }

  saveAccessPoint(): void {
    if (this.formGroupAccessPoints.invalid) {
      this.formGroupAccessPoints.updateValueAndValidity();
      Object.keys(this.formGroupAccessPoints.controls).forEach(key => {
        this.formGroupAccessPoints.get(key).markAsDirty();
      });
    } else {
      const coords = {
        lng: this.formGroupAccessPoints.get('_lng').value,
        lat: this.formGroupAccessPoints.get('_lat').value};
      this.ap = new Reaccesspoint(coords, null);
      let subscription: Observable<{}>;
      if (this.mode === 'CREATE') {
        subscription = this.serviceOrganizations
          .createAccessPoint(Object.assign(this.ap, this.formGroupAccessPoints.value));
      } else if (this.mode === 'UPDATE') {
        subscription = this.serviceOrganizations
          .updateAccessPoint(Object.assign(this.ap, this.formGroupAccessPoints.value));
      }
      subscription.subscribe(
        (response) => {
          window.location.reload();
          // todo: implement me
        },
        (error) => {
          // todo: implement me
          this._snackBar.open(error.message, 'Ок');
          throw Error(`${error.message}\n${JSON.stringify(error.error, undefined, 2)}`);
        },
      );
    }
  }

  get isESPD() {
    return this.formGroupAccessPoints.get('_type').value === 'ESPD'
  }
  get isSMO() {
    return this.formGroupAccessPoints.get('_type').value === 'SMO'
  }

  showErrors(fieldName: string) {
    return this.formGroupAccessPoints.get(fieldName).invalid && (this.formGroupAccessPoints.get(fieldName).touched || this.formGroupAccessPoints.get(fieldName).dirty)
  }
  hasError(fieldName: string, validatorName: string) {
    return this.formGroupAccessPoints.get(fieldName).errors?.[validatorName]
  }
}
