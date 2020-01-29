import {Component, OnInit} from '@angular/core';
import {LocationService} from '@core/services/location.service';
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
  locations: Observable<PaginatedList<Location>>;
  pageNumber = 1;
  itemsPerPage = 10;

  constructor(private locationService: LocationService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.locations = this.locationService.list().pipe(
      tap(() => {
        this.spinner.hide();
      })
    );
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.locations = this.loadPagedLocationWithContracts();
  }

  loadPagedLocationWithContracts() {
    this.spinner.show();
    return this.locationService.list().pipe(
      tap(lcs => {
        console.log(lcs);
        this.spinner.hide();
      })
    );
  }
}
