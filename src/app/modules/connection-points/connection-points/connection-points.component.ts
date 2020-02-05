import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  InternetAccessType,
  Location,
  GovernmentProgram,
  OrganizationType,
  SmoType,
} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GovernmentProgramService, OrganizationsService} from '@core/services';

@Component({
  selector: 'app-connection-points',
  templateUrl: './connection-points.component.html',
  styleUrls: ['./connection-points.component.scss'],
})
export class ConnectionPointsComponent implements OnInit {
  locations$: Observable<PaginatedList<Location>>;
  fLocations$: Observable<Location[]>;
  fParents$: Observable<Location[]>;
  fInternetAccessTypes$: Observable<InternetAccessType[]>;
  fOrganizationTypes$: Observable<OrganizationType[]>;
  fOrganizationSMOTypes$: Observable<SmoType[]>;
  fGovermentPrograms$: Observable<GovernmentProgram[]>;

  pageNumber = 1;
  itemsPerPage = 10;

  form: FormGroup;

  OrderingDirection = OrderingDirection;

  constructor(
    private serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.locations$ = this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide();
      })
    );

    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovermentPrograms$ = this.serviceGovernmentProgram.list();
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();

    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      order: null,
      location: null,
      type: null,
      smo: null,
      organization: null,
      parent: null,
      connectionType: null,
      contractType: null,
      contractor: null,
    });

    this.form.valueChanges.subscribe(v => {
      this.serviceLocation.filter(v);
      this.locations$ = this.loadPagedLocationWithOrganizationAccessPoints();
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.locations$ = this.loadPagedLocationWithOrganizationAccessPoints();
  }

  loadPagedLocationWithOrganizationAccessPoints() {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage);
  }
}
