import { Component, OnInit } from '@angular/core';
import { AccountService } from '@service/account/AccountService';
import { LocationTableItem } from '@service/dto/LocationTableItem';
import { LocationsFullInformationService } from '@service/locations';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/ui/loader/LoaderService';
import { LocationFilters } from 'src/app/ui/locations-page/location-filters/LocationFilters';

type LocationPanelItem = LocationTableItem & {
  active: boolean;
  disable: boolean;
};

const addPanelControl = (location: LocationTableItem): LocationPanelItem => ({
  ...location,
  active: false,
  disable: false,
});

@Component({
  selector: 'locations-page-mobile',
  templateUrl: './locations-page-mobile.html',
  styleUrls: ['./locations-page-mobile.scss'],
})
export class LocationsPageMobile implements OnInit {
  panels = [
    {
      active: true,
      disabled: false,
      areaName: 'Абанский р-н',
      name: 'Абан п.',
    },
    {
      active: false,
      disabled: false,
      areaName: 'Абанский р-н',
      name: '	Алексеевка д.',
    },
    {
      active: false,
      disabled: false,
      areaName: 'Абанский р-н',
      name: 'Апано-Ключи с.',
    },
  ];

  locations: LocationPanelItem[];
  totalElements: number;
  filters: LocationFilters;
  page: number;
  countPerPage: number;
  isLoading: boolean;

  constructor(
    private readonly locationsFullInformationService: LocationsFullInformationService,
    private readonly accountService: AccountService,
    private readonly loaderService: LoaderService
  ) {
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
          this.locations = response.content.map(addPanelControl);
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
    console.log('onScrollDown');

    if (this.isLoading) {
      return
    }

    this.page++;
    this.isLoading = true;
    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, this.filters)
      .subscribe(
        (response) => {
          console.log('response');

          this.locations = [
            ...this.locations,
            ...response.content.map(addPanelControl),
          ];
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
