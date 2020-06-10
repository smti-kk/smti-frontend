import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

import {GovernmentProgram, InternetAccessType, Location, Organization, Quality, qualityToString} from '@core/models';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {
  LocationService,
  LocationServiceOrganizationAccessPointsWithFilterParams,
} from '@core/services/location.service';
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

  points$: Observable<Reaccesspoint[]>;

  ap: Reaccesspoint;

  formGroupAccessPoints: FormGroup;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  fLocations$: Observable<Location[]>;

  fGovernmentPrograms$: Observable<GovernmentProgram[]>;

  Quality = Quality;

  qualityToString = qualityToString;

  compareFn = compareById;

  constructor(
    private serviceOrganizations: OrganizationsService,
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private locationsService: LocationService,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    const organizationId = this.activatedRoute.snapshot.params.id;
    const locationId = parseInt(this.activatedRoute.snapshot.queryParams.locationId, 10);

    this.points$ = this.serviceOrganizations.getPoints(organizationId);

    if (organizationId) {
      this.serviceOrganizations.getByIdentifier(organizationId).subscribe(organization => {
        this.organization = organization;
      });
    } else {
      const organization = new Organization(locationId);
      this.organization = organization;
    }
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
