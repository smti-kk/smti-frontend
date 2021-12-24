import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Signal} from '@api/dto/Signal';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {LocationsFullInformationService} from '@service/locations';
import {MunFilters} from './mun-requests-filters/MunFilters';
import {MunRequestComponent} from './mun-request/mun-request.component';
import {MunRequestsFilterService} from './services/mun-requests-filter.service';

@Component({
  selector: 'app-mun-requests',
  templateUrl: './mun-requests.component.html',
  styleUrls: ['./mun-requests.component.scss'],
})
export class MunRequestsComponent implements OnInit {
  locations: LocationTableItem[];

  filteredLocations: LocationTableItem[];

  filters: MunFilters;

  currentPage = 1;

  itemsPerPage = 10;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly locationService: LocationsFullInformationService,
    private munFilter: MunRequestsFilterService
  ) {}

  ngOnInit(): void {
    this.locationService.listByUser().subscribe((locations) => {
      this.locations = locations;
      this.filteredLocations = locations;
    });
  }

  sendRequest(locationId: number): void {
    this.matDialog.open(MunRequestComponent, {
      height: '600px',
      minWidth: '800px',
      data: locationId,
    });
  }

  signalsToString(tvOrRadioTypes: Signal[]): string {
    return tvOrRadioTypes.map((tvOrRadioType) => tvOrRadioType.name).join(', ');
  }

  setFilter(filters: MunFilters): void {
    this.filters = filters;
    this.currentPage = 1;
    this.filteredLocations = this.munFilter.requestsWithFilter(
      this.locations,
      this.filters
    );
  }
}
