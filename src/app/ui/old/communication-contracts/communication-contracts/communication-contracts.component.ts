import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, share} from 'rxjs/operators';

import {InternetAccessType, Location, OrganizationType, SmoType} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {LocationServiceContractsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';
import {OrganizationsService} from '@core/services';
import {Contract} from '@core/models/contract';

const FIRST_PAGE = 1;

@Component({
  selector: 'app-communication-contracts',
  templateUrl: './communication-contracts.component.html',
  styleUrls: ['./communication-contracts.component.scss'],
})
export class CommunicationContractsComponent implements OnInit {
  contracts: PaginatedList<Contract>;
  fLocations$: Observable<Location[]>;
  fParents$: Observable<Location[]>;
  fOrganizationSMOTypes$: Observable<SmoType[]>;
  fOrganizationTypes$: Observable<OrganizationType[]>;
  fInternetAccessTypes$: Observable<InternetAccessType[]>;
  pageNumber = FIRST_PAGE;
  itemsPerPage = 10;
  form: FormGroup;
  initialValues;
  OrderingDirection = OrderingDirection;
  isVisibleFilter = false;
  dateFormat = 'dd.MM.yyyy';


  constructor(
    public serviceLocation: LocationServiceContractsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private serviceOrganizations: OrganizationsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).subscribe(response => {
      this.contracts = response;
    });
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();
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
      time: null,
      contractStart: null,
      contractEnd: null,
      populationStart: null,
      populationEnd: null,
      logicalCondition: 'AND',
    });
    this.initialValues = this.form.value

    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe(v => {
        this.serviceLocation.filter(v);
        this.pageNumber = FIRST_PAGE;
        this.loadPagedLocationWithContracts().subscribe(response => {
          this.contracts = response;
        });
      });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadPagedLocationWithContracts().subscribe(response => {
      this.contracts.results = [...this.contracts.results, ...response.results];
    });
  }

  loadPagedLocationWithContracts(): Observable<PaginatedList<Contract>> {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(share());
  }

  showFilterBody(): void {
    this.isVisibleFilter = !this.isVisibleFilter;
  }

  resetFilters(): void {
    this.form.reset(this.initialValues);
  }

}
