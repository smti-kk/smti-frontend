import { Component, OnInit } from '@angular/core';
import { AccountService } from '@service/account/AccountService';
import { LocationTableItem } from '@service/dto/LocationTableItem';
import { LocationsFullInformationService } from '@service/locations';
import { OrderingFilter } from '@shared/layout/value-accessors/filter-btn/filter-btn.component';
import { map } from 'rxjs/operators';
import { OrderingDirection } from 'src/app/ui/buttons/filter-btn/filter-btn.component';
import { LoaderService } from 'src/app/ui/loader/LoaderService';
import { LocationFilters } from 'src/app/ui/locations-page/location-filters/LocationFilters';

type SortBtn = {
  name: string;
  value: 'parent' | 'name' | 'people_count';
  order: OrderingDirection;
};

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
  sortBtn: SortBtn[] = [
    {
      name: 'Населенные пункты',
      value: 'name',
      order: OrderingDirection.UNDEFINED,
    },
    {
      name: 'Муниципальные образования',
      value: 'parent',
      order: OrderingDirection.UNDEFINED,
    },
    {
      name: 'Численность',
      value: 'people_count',
      order: OrderingDirection.UNDEFINED,
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
        () => {
          this.isLoading = false;
        }
      );
  }

  onScrollDown(): void {
    if (this.isLoading) {
      return;
    }

    this.page++;
    this.isLoading = true;
    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, this.filters)
      .subscribe(
        (response) => {
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

  isActive(btn: SortBtn) {
    return (
      btn.order === OrderingDirection.ASC || btn.order === OrderingDirection.DSC
    );
  }
  isDSC(btn: SortBtn) {
    return btn.order === OrderingDirection.DSC;
  }

  onClickSortBtn(btnValue: string) {
    const crnBtn = this.sortBtn.find(({ value }) => value === btnValue)!;

    switch (crnBtn.order) {
      case OrderingDirection.UNDEFINED:
        crnBtn.order = OrderingDirection.ASC;
        break;
      case OrderingDirection.ASC:
        crnBtn.order = OrderingDirection.DSC;
        break;
      case OrderingDirection.DSC:
        crnBtn.order = OrderingDirection.UNDEFINED;
        break;
      default:
        crnBtn.order = OrderingDirection.UNDEFINED;
        break;
    }
    this.sortBtn.forEach((btn) => {
      if (btn === crnBtn) {
        return;
      }
      btn.order = OrderingDirection.UNDEFINED;
    });
    this.filters.ordering = {
      name: crnBtn.value,
      orderingDirection: crnBtn.order
    };
    this.filter(this.filters);
  }

  filter(filters: LocationFilters): void {
    this.page = 0;
    this.filters = filters;

    this.locationsFullInformationService
      .filteredLocations(this.page, this.countPerPage, filters)
      .subscribe((locations) => {
        this.locations = locations.content.map(addPanelControl);
        this.totalElements = locations.totalElements;
      });
  }

  onFilterInit(filterValue) {
    this.filters = filterValue;
  }

  exportExcel(): void {
    this.locationsFullInformationService.exportExcel();
  }
}
