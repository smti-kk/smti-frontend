import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {debounceTime, share} from 'rxjs/operators';

import {
  GovernmentProgram,
  InternetAccessType,
  Location,
  OrganizationType,
  SmoType,
} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {GovernmentProgramService, OrganizationsService} from '@core/services';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {NzModalService} from 'ng-zorro-antd';
import {FormOrganizationComponent} from '@shared/components/form-organization/form-organization.component';
import {AccessPointTypeService} from '../../core/services/accesspoint-type.service';
import {AccessPointType} from '../../core/models/accesspoint-type';
import {SearchAddressComponent} from 'src/app/ui/old/connection-points/connection-points/search-address/search-address.component';

@Component({
  selector: 'app-connection-points',
  templateUrl: './connection-points.component.html',
  styleUrls: ['./connection-points.component.scss'],
})
export class ConnectionPointsComponent implements OnInit {
  points: PaginatedList<Reaccesspoint>;
  fLocations$: Observable<Location[]>;
  fParents$: Observable<Location[]>;
  fInternetAccessTypes$: Observable<InternetAccessType[]>;
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
  filterTimeout;

  @ViewChild('searchAddress') searchAddress: SearchAddressComponent;

  constructor(
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceGovernmentProgram: GovernmentProgramService,
    private serviceOrganizations: OrganizationsService,
    private serviceAccessPointTypeService: AccessPointTypeService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).subscribe((response) => {
      this.points = response;
      this.spinner.hide();
    });
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
    this.fGovernmentPrograms$ = this.serviceGovernmentProgram.list();
    this.fOrganizationTypes$ = this.serviceOrganizations.getTypes();
    this.fOrganizationSMOTypes$ = this.serviceOrganizations.getSMOTypes();
    this.fPoints$ = this.serviceAccessPointTypeService.getAccessPointType();
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
      populationStart: null,
      populationEnd: null,
      point: null,
      address: null,
    });
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.serviceLocation.filter(v);
      this.pageNumber = 1;
      this.loadPagedLocationWithOrganizationAccessPoints().subscribe((response) => {
        this.points = response;
      });
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadPagedLocationWithOrganizationAccessPoints().subscribe((response) => {
      this.points.results = [...this.points.results, ...response.results];
    });
  }

  loadPagedLocationWithOrganizationAccessPoints(): Observable<PaginatedList<Reaccesspoint>> {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(share());
  }

  showFilterBody(): void {
    this.isVisibleFilter = !this.isVisibleFilter;
  }

  openModal(): void {
    this.modal.create({
      nzTitle: 'Добавить новую организацию',
      nzContent: FormOrganizationComponent,
      nzFooter: null,
    });
  }

  onSelectAddress(event: string) {
    this.form.controls['address'].setValue(event);
  }

  resetFilters(): void {
    this.form.reset();
    this.searchAddress.searchControl.reset();
  }
}
