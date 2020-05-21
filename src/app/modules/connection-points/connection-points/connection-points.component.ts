import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';

import {GovernmentProgram, InternetAccessType, Location, Organization, OrganizationType, SmoType} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {Reaccesspoint} from '@core/models/reaccesspoint';

@Component({
  selector: 'app-connection-points',
  templateUrl: './connection-points.component.html',
  styleUrls: ['./connection-points.component.scss'],
})
export class ConnectionPointsComponent implements OnInit {
  points$: Observable<PaginatedList<Reaccesspoint>>;

  fLocations$: Observable<Location[]>;

  fParents$: Observable<Location[]>;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  fOrganizationTypes$: Observable<OrganizationType[]>;

  fOrganizationSMOTypes$: Observable<SmoType[]>;

  fGovernmentPrograms$: Observable<GovernmentProgram[]>;

  pageNumber = 1;

  itemsPerPage = 10;

  form: FormGroup;

  OrderingDirection = OrderingDirection;

  isVisibleFilter = false;

  setLocation: any;

  constructor(
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.points$ = this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide();
      }),
      share()
    );

    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();

    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      order: null,
      location: null,
      type: null,
      smo: null,
      organization: null,
      parent: null,
      contract: null,
      contractor: null,
      connectionType: null,
      contractType: null,
    });

    this.form.valueChanges.subscribe(v => {
      this.serviceLocation.filter(v);
      this.points$ = this.loadPagedLocationWithOrganizationAccessPoints();
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.points$ = this.loadPagedLocationWithOrganizationAccessPoints();
  }

  loadPagedLocationWithOrganizationAccessPoints(): Observable<PaginatedList<Reaccesspoint>> {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(share());
  }

  showFilterBody() {
    this.isVisibleFilter = !this.isVisibleFilter;
  }
}
