import {Component, OnInit} from '@angular/core';
import {LocationServiceWithFilterParams} from '@core/services/location.service';
import {Location} from '@core/models';
import {NgxSpinnerService} from 'ngx-spinner';
import {PaginatedList} from '@core/models/paginated-list';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-communication-contracts',
  templateUrl: './communication-contracts.component.html',
  styleUrls: ['./communication-contracts.component.scss'],
})
export class CommunicationContractsComponent implements OnInit {
  locationsObs: Observable<PaginatedList<Location>>;
  pageNumber = 1;
  itemsPerPage = 10;

  constructor(
    private locationService: LocationServiceWithFilterParams,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.locationsObs = this.locationService.paginatedList(this.pageNumber, this.itemsPerPage).pipe(
      tap(() => {
        this.spinner.hide();
      })
    );
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.locationsObs = this.loadPagedLocationWithContracts();
  }

  loadPagedLocationWithContracts() {
    return this.locationService.paginatedList(this.pageNumber, this.itemsPerPage);
  }
}
