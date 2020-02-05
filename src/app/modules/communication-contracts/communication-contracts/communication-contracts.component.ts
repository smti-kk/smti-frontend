import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InternetAccessType, Location} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {
  LocationService,
  LocationServiceContractsWithFilterParams,
} from '@core/services/location.service';
import {OrderingDirection} from '@core/services/tc-pivots.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {InternetAccessTypeService} from '@core/services/internet-access-type.service';

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

  pageNumber = 1;
  itemsPerPage = 10;

  form: FormGroup;

  OrderingDirection = OrderingDirection;

  constructor(
    private serviceLocation: LocationServiceContractsWithFilterParams,
    private serviceInternetAccessType: InternetAccessTypeService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.locations$ = this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide();
      })
    );

    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fParents$ = this.serviceLocation.listParentLocations();
    this.fInternetAccessTypes$ = this.serviceInternetAccessType.list();

    this.buildForm();
  }

  buildForm() {
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
      this.locations$ = this.loadPagedLocationWithContracts();
    });
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.locations$ = this.loadPagedLocationWithContracts();
  }

  loadPagedLocationWithContracts() {
    return this.serviceLocation.paginatedList(this.pageNumber, this.itemsPerPage);
  }
}
