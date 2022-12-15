import { Component, Input, OnInit, Optional } from '@angular/core';
import { compareById } from '@core/utils/compare';
import { Reaccesspoint } from '@core/models/reaccesspoint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GovernmentProgramService, OrganizationsService } from '@core/services';
import { InternetAccessTypeService } from '@core/services/internet-access-type.service';
import { Observable } from 'rxjs';
import {
  GovernmentProgram,
  InternetAccessType,
  Organization,
  Quality,
  qualityToString,
  participationStatusToString,
} from '@core/models';
import { AccessPointType } from '@core/models/accesspoint-type';
import { AccessPointService } from '@core/services/accesspoint-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParticipationStatus } from '../../../core/models';
import { NzModalRef } from 'ng-zorro-antd';
import { Deserialize, Serialize } from 'cerialize';
import { APChangesService } from '@core/services/apChanges.service';
import { APChanges } from '@core/models/apChanges';

const IP_REGEXP =
  /^([01]?\d\d?|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])){3}(?:\/[0-2]\d|\/3[0-2])?$/gm;

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
  apChanges$: Observable<APChanges[]>;
  formGroupAccessPoints: FormGroup;
  ap: Reaccesspoint | null = null;
  Quality = Quality;
  qualityToString = qualityToString;
  compareFn = compareById;
  participationStatusToString: (status: ParticipationStatus) => string =
    participationStatusToString;

  constructor(
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private serviceAccessPointType: AccessPointService,
    private formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    @Optional() private readonly _ref: NzModalRef,
    private readonly apChangesService: APChangesService
  ) {}

  ngOnInit(): void {
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    this.accessPointType$ = this.serviceAccessPointType.getAccessPointType();
    this.apChanges$ = this.apChangesService.getApChanges();

    if (this.accessPointForEdit) {
      this.buildForm(this.accessPointForEdit);
    } else {
      this.buildForm();
    }
  }

  private buildForm(point?: Reaccesspoint): void {
    this.formGroupAccessPoints = this.formBuilder.group({
      id: point ? point.id : null,
      address: [point ? point.address : null, Validators.required],
      // avstatus: null,
      billingId: null,
      completed: null,
      connectionType: [
        point ? point.connectionType : null,
        Validators.required,
      ],
      organizationId: this.organization.id || null,
      organization: this.organization,
      locationId: this.organization.location.valueOf() || null,
      contractor: [null],
      // createdAt: null,
      customer: null,
      declaredSpeed: null,
      description: null,
      governmentProgram: null,
      ipConfig: null,
      maxAmount: null,
      name: this.organization.name || null,
      point: this.formBuilder.group({
        lat: [point ? point.point.lat : null, Validators.required],
        lng: [point ? point.point.lng : null, Validators.required],
      }),

      // netTrafficLastMonth: null,
      // netTrafficLastWeek: null,
      node: null,
      operator: null,
      quality: null,
      state: null,
      ucn: null,
      // updatedAt: null,
      visible: true,
      type: [null, Validators.required],
      amount: null,
      number: null,
      equipment: null,
      softType: null,
      //----
      zspdWhiteIp: [null, Validators.pattern(IP_REGEXP)],
      contract: null,
      numIncomingMessage: null,
      numSourceEmailsRTK: null,
      mounthlyPay: null,
      oneTimePay: null,
      espdWhiteIp: null,
      contractId: null,
      availZspdOrMethodConToZspd: null,
      dateCommissioning: null,
      commentary: null,
      contacts: null,
      dateConnectionOrChange: null,
      change: null,
    });

    if (this.type) {
      this.formGroupAccessPoints.get('type').disable();
      this.formGroupAccessPoints.get('type').patchValue(this.type);
    }
    if (point) {
      const tmp = Serialize(this.accessPointForEdit, Reaccesspoint);
      this.formGroupAccessPoints.patchValue(tmp);
      this.formGroupAccessPoints.get('connectionType').patchValue(point.connectionType);
    }
  }

  saveAccessPoint(): void {
    if (this.formGroupAccessPoints.invalid) {
      this.formGroupAccessPoints.updateValueAndValidity();
      Object.keys(this.formGroupAccessPoints.controls).forEach((key) => {
        this.formGroupAccessPoints.get(key).markAsDirty();
      });
    } else {


      const orig = Serialize(this.accessPointForEdit, Reaccesspoint) ?? {};
      this.ap = Deserialize(
        Object.assign(orig, {
          ...this.formGroupAccessPoints.value,
          internetAccess: this.formGroupAccessPoints.value.connectionType,
          organizationId: this.organization.id,
        }),
        Reaccesspoint
      );
      let subscription: Observable<Reaccesspoint>;
      if (this.mode === 'CREATE') {
        subscription = this.serviceOrganizations.createAccessPoint(this.ap);
      } else if (this.mode === 'UPDATE') {
        subscription = this.serviceOrganizations.updateAccessPoint(this.ap);
      }
      subscription.subscribe({
        next: (response) => {
          this.ap = response;
          if (this._ref) {
            this._ref.triggerOk()
          }
        },
        error: (error) => {
          this.ap = null;
          this._snackBar.open(error.message, 'Ок');
          throw Error(
            `${error.message}\n${JSON.stringify(error.error, undefined, 2)}`
          );
        }
      });
    }
  }

  get isESPD() {
    return this.formGroupAccessPoints.get('type').value === 'ESPD';
  }
  get isSMO() {
    return this.formGroupAccessPoints.get('type').value === 'SMO';
  }

  showErrors(fieldName: string) {
    return (
      this.formGroupAccessPoints.get(fieldName).invalid &&
      (this.formGroupAccessPoints.get(fieldName).touched ||
        this.formGroupAccessPoints.get(fieldName).dirty)
    );
  }
  hasError(fieldName: string, validatorName: string) {
    return this.formGroupAccessPoints.get(fieldName).errors?.[validatorName];
  }
}
