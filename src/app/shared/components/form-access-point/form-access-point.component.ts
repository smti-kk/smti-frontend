import {Component, Input, OnInit} from '@angular/core';
import {compareById} from '@core/utils/compare';
import {Coordinate} from '@map-wrapper/interface/coordinate';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {Observable} from 'rxjs';
import {GovernmentProgram, InternetAccessType, Organization, Quality, qualityToString} from '@core/models';

@Component({
  selector: 'app-form-access-point',
  templateUrl: './form-access-point.component.html',
  styleUrls: ['./form-access-point.component.scss'],
})

export class FormAccessPointComponent implements OnInit {

  @Input() accessPointForEdit: Reaccesspoint;
  @Input() organization: Organization;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  fGovernmentPrograms$: Observable<GovernmentProgram[]>;

  formGroupAccessPoints: FormGroup;

  ap: Reaccesspoint;

  Quality = Quality;

  qualityToString = qualityToString;

  compareFn = compareById;

  constructor(
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();

    if (this.accessPointForEdit) {
      this.buildForm(this.accessPointForEdit);
    } else {
      this.buildForm();
    }

    console.log(this.accessPointForEdit);
    console.log(this.organization);
  }

  private buildForm(point?: Reaccesspoint): void {
    const coords: Coordinate = {lat: 94, lng: 56};
    this.ap = new Reaccesspoint(coords, null);
    this.formGroupAccessPoints = this.formBuilder.group({
      _address: null,
      // _avstatus: null,
      _billingId: null,
      // _completed: null,
      _connectionType: null,
      _organizationId: this.organization.id || null,
      _locationId: this.organization.location.valueOf() || null,
      _contractor: null,
      // _createdAt: null,
      _customer: null,
      _declaredSpeed: null,
      _description: null,
      _governmentProgram: null,
      _ipConfig: null,
      _maxAmount: null,
      _name: this.organization.name || null,
      // _netTrafficLastMonth: null,
      // _netTrafficLastWeek: null,
      _node: null,
      _operator: null,
      _quality: null,
      _state: null,
      _ucn: null,
      // _updatedAt: null,
      _visible: true,
    });

    if (point) {
      this.formGroupAccessPoints.patchValue(point);
    }
  }

  saveAccessPoint(): void {
    this.serviceOrganizations
      .createAccessPoint(Object.assign(this.ap, this.formGroupAccessPoints.value))
      .subscribe(
        () => {
          window.location.reload();
          // todo: implement me
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error => {
          // todo: implement me
          throw Error(`${error}`);
        },
      );
  }
}
