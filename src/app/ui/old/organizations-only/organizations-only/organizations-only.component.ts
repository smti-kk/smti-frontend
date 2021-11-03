import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, share, tap} from 'rxjs/operators';

import {GovernmentProgram, InternetAccessType, Location, Organization, OrganizationType, SmoType} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
// import {GovernmentProgramService, OrganizationServiceWithFilterParams, OrganizationsService} from '@core/services';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {NzModalService} from 'ng-zorro-antd';
import {FormOrganizationComponent} from '@shared/components/form-organization/form-organization.component';
import {AccessPointTypeService} from '../../core/services/accesspoint-type.service';
import {AccessPointType} from '../../core/models/accesspoint-type';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import {GovernmentProgramService, OrganizationServiceWithFilterParams} from '../../core/services';

@Component({
  selector: 'app-organizations-only',
  templateUrl: './organizations-only.component.html',
  styleUrls: ['./organizations-only.component.scss'],
})
export class OrganizationsOnlyComponent implements OnInit {
  points$: Observable<PaginatedList<Reaccesspoint>>;

  fLocations$: Observable<Location[]>;

  fParents$: Observable<Location[]>;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  organizations$: Observable<PaginatedList<Organization>>;

  fOrganizationTypes$: Observable<OrganizationType[]>;

  fOrganizationSMOTypes$: Observable<SmoType[]>;

  fGovernmentPrograms$: Observable<GovernmentProgram[]>;

  fPoints$: Observable<AccessPointType[]>;

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
    private serviceOrganizations: OrganizationServiceWithFilterParams,
    private serviceAccessPointTypeService: AccessPointTypeService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.organizations$ = this.serviceOrganizations.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide();
      }),
      share()
    );

    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    // this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    // this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();
    // this.fPoints$ = this.serviceAccessPointTypeService.getAccessPointType();

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
      populationStart: null,
      populationEnd: null,
      logicalCondition: 'AND',
    });
    // contract: null,
    //   contractor: null,
    //   connectionType: null,
    //   contractType: null,
    //   point: null,

    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    ).subscribe(v => {
      this.serviceOrganizations.filter(v);
      this.organizations$ = this.loadPagedLocationWithOrganization();
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.organizations$ = this.loadPagedLocationWithOrganization();
  }

  loadPagedLocationWithOrganization(): Observable<PaginatedList<Organization>> {
    return this.serviceOrganizations.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      share()
    );
  }

  showFilterBody() {
    this.isVisibleFilter = !this.isVisibleFilter;
  }

  openModal() {
    this.modal.create({
      nzTitle: 'Добавить новую организацию',
      nzContent: FormOrganizationComponent,
      nzFooter: null,
    });
  }

  modifyControlValue(value: string, key: string) {
    this.form.controls[key].setValue(value);
  }
}
