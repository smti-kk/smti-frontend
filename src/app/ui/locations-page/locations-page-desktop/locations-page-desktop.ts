import { Component, OnInit } from '@angular/core';
import { LocationsFullInformationService } from '@service/locations/LocationsFullInformationService';
import { LocationTableItem } from '@service/dto/LocationTableItem';
import { LocationFilters } from '../location-filters/LocationFilters';
import { LoaderService } from '../../loader/LoaderService';
import { AccountService } from '@service/account/AccountService';
import { Account } from '@service/account/Account';

@Component({
  selector: 'locations-page-desktop',
  templateUrl: './locations-page-desktop.html',
  styleUrls: ['./locations-page-desktop.scss'],
})
export class LocationsPageDesktop implements OnInit {
  TABLE_HEIGHT_WHEN_NOT_OPENED_FILTERS = 'calc(100vh - 194px)';
  TABLE_HEIGHT_WHEN_OPENED_FILTERS = 'calc(100vh - 396px)';

  displayedColumns = [
    'areaName',
    'name',
    'population',
    'hasESPD',
    'hasSMO',
    'hasZSPD',
    'ats',
    'payphone',
    'infomat',
    'post',
    'television',
    'radio',
    'cellular',
    'internet',
    'contract',
  ];

  locations: LocationTableItem[];
  totalElements: number;
  page: number;
  countPerPage: number;
  isLoading: boolean;
  user: Account;
  filters: LocationFilters;

  constructor(
    private readonly locationsFullInformationService: LocationsFullInformationService,
    private readonly accountService: AccountService,
    private readonly loaderService: LoaderService,
  ) {
    accountService.get().subscribe((user) => {
      this.user = user;
      if (!user || user.getRole().indexOf('GUEST') !== -1) {
        this.displayedColumns.splice(
          this.displayedColumns.indexOf('hasESPD'),
          1
        );
        this.displayedColumns.splice(
          this.displayedColumns.indexOf('hasSMO'),
          1
        );
        this.displayedColumns.splice(
          this.displayedColumns.indexOf('hasZSPD'),
          1
        );
      }
    });
    this.loaderService = loaderService;
    this.page = 0;
    this.countPerPage = 30;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, this.filters)
      .subscribe(
        (response) => {
          this.locations = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
          this.loaderService.stopLoader();
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  onScrollDown(): void {
    this.page++;
    this.isLoading = true;
    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, this.filters)
      .subscribe(
        (response) => {
          this.locations = [...this.locations, ...response.content];
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  filter(filters: LocationFilters): void {
    this.page = 0;
    this.filters = filters;

    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, filters)
      .subscribe((locations) => {
        this.locations = locations.content;
        this.totalElements = locations.totalElements;
      });
  }

  exportExcel(): void {
    this.locationsFullInformationService.exportExcel();
  }

  onSort(ordering) {
    this.filters.ordering = ordering;
    this.filter(this.filters);
  }

  onFilterInit(filterValue) {
    this.filters = filterValue;
  }
}
