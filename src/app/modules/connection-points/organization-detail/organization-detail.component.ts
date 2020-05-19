import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {
  GovernmentProgram,
  InternetAccessType,
  Location,
  Organization,
  OrganizationType,
  Quality,
  qualityToString,
  SmoType,
} from '@core/models';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {Coordinate} from '@map-wrapper/interface/coordinate';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {compareById} from '@core/utils/compare';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;

  formGroupOrganization: FormGroup;

  ap: Reaccesspoint;

  formGroupAccessPoints: FormGroup;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  fOrganizationTypes$: Observable<OrganizationType[]>;

  fOrganizationSMOTypes$: Observable<SmoType[]>;

  fLocations$: Observable<Location[]>;

  fGovernmentPrograms$: Observable<GovernmentProgram[]>;

  Quality = Quality;

  qualityToString = qualityToString;

  compareFn = compareById;

  constructor(
    private serviceOrganizations: OrganizationsService,
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    const organizationId = this.activatedRoute.snapshot.params.id;
    const locationId = parseInt(this.activatedRoute.snapshot.queryParams.locationId, 10);

    if (organizationId) {
      this.serviceOrganizations.getByIdentifier(organizationId).subscribe(organization => {
        this.buildForm(organization);
        this.organization = organization;
      });
    } else {
      const organization = new Organization(locationId);
      this.buildForm(organization);
      this.organization = organization;
    }
  }

  private buildForm(o: Organization): void {
    this.formGroupOrganization = this.formBuilder.group({
      _id: null,
      _location: null,
      _name: [null, Validators.required],
      // _fullName: [null, Validators.required],
      _address: [null, Validators.required],
      _inn: [null, Validators.required],
      _kpp: [null, Validators.required],
      _fias: [
        null,
        [
          Validators.pattern(
            '\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b'
          ),
          Validators.required,
        ],
      ],
      _type: null,
      _smoType: null,
    });

    this.formGroupOrganization.patchValue(o);

    this.formGroupOrganization.disable();
  }

  cancelEdit(): void {
    this.formGroupOrganization.reset();
    this.formGroupOrganization.patchValue(this.organization);
    this.formGroupOrganization.disable();
  }

  enableForm(): void {
    this.formGroupOrganization.enable();
  }

  saveRequest(): void {
    this.serviceOrganizations.put(this.formGroupOrganization.value).subscribe(
      organization => {
        this.organization = organization;
      },
      error => {
        // todo: обработка ошибки
        this.formGroupOrganization.enable();
        throw Error(`${error}`);
      }
    );
    this.formGroupOrganization.disable();
  }

  isCreate(): boolean {
    return this.organization && !this.organization.id;
  }

  saveOrganization(): void {
    this.serviceOrganizations.save(this.formGroupOrganization.value).subscribe(
      () => {
        this.router.navigateByUrl('connection-points');
        // todo: implement me
      },
      error => {
        throw Error(`${error}`);
        // todo: implement me
      }
    );
  }

  addNewAccessPoint(): void {
    const coords: Coordinate = {lat: 94, lng: 56};
    this.ap = new Reaccesspoint(coords, null);
    this.formGroupAccessPoints = this.formBuilder.group({
      _address: null,
      // _avstatus: null,
      _billingId: null,
      // _completed: null,
      _connectionType: null,
      _organizationId: this.organization.id,
      _locationId: this.organization.location.valueOf(),
      _contractor: null,
      // _createdAt: null,
      _customer: null,
      _definedSpeed: null,
      _description: null,
      _governmentProgram: null,
      _ipConfig: null,
      _maxAmount: null,
      _name: this.organization.name,
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
        }
      );
  }
}
