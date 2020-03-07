import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {InternetAccessType, Location} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {LocationServiceContractsWithFilterParams} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';

const FIRST_PAGE = 1;

@Component({
  selector: 'app-communication-contracts',
  templateUrl: './communication-contracts.component.html',
  styleUrls: ['./communication-contracts.component.scss'],
})
export class CommunicationContractsComponent implements OnInit {
  locations$: Observable<PaginatedList<Location>>;

  fLocations$: Observable<Location[]>;

  fParents$: Observable<Location[]>;

  fInternetAccessTypes$: Observable<InternetAccessType[]>;

  pageNumber = FIRST_PAGE;

  itemsPerPage = 10;

  form: FormGroup;

  OrderingDirection = OrderingDirection;

  constructor(
    public serviceLocation: LocationServiceContractsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.locations$ = this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide().then();
      }),
      share()
    );

    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();

    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      order: null,
      location: null,
      parent: null,
      organization: null,
      contract: null,
      contractor: null,
      connectionType: null,
    });

    this.form.valueChanges.subscribe(v => {
      this.serviceLocation.filter(v);
      this.onPageChange(FIRST_PAGE);
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.locations$ = this.loadPagedLocationWithContracts();
  }

  loadPagedLocationWithContracts(): Observable<PaginatedList<Location>> {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(share());
  }
}
