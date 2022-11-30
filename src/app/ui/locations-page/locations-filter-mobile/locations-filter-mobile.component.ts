import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LocationFilters } from '../location-filters/LocationFilters';
import { LocationFilterFormBuilder } from '@service/locations/LocationFilterForm';
import { forkJoin, Observable } from 'rxjs';
import { SelectAreasService } from '@service/area/SelectAreasService';
import { GovProgramService } from '@service/gov-program/GovProgramService';
import { GovProgram } from '@api/dto/GovProgram';
import { LocationDetailApi } from '@api/locations/LocationDetailApi';
import { Location } from '@core/models';
import { LocationServiceOrganizationAccessPointsWithFilterParams } from '@core/services/location.service';
import { AccountService } from '@service/account/AccountService';
import { Account } from '@service/account/Account';
import { SelectAreaItem } from '@service/dto/SelectAreaItem';

@Component({
  selector: 'location-filters-mobile',
  templateUrl: './locations-filter-mobile.component.html',
  styleUrls: ['./locations-filter-mobile.component.scss'],
})
export class LocationsFilterMobileComponent implements OnInit {
  filterForm: FormGroup;
  programs: GovProgram[];
  filtersIsOpened: boolean;
  govYears: number[];

  fLocations$: Observable<Location[]>;
  fAreas$: Observable<SelectAreaItem[]>;
  user: Account;

  @Output() filters: EventEmitter<LocationFilters>;
  @Output() init: EventEmitter<LocationFilters> =
    new EventEmitter<LocationFilters>();
  @Output() exportExcel: EventEmitter<void>;

  constructor(
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private readonly filterFormBuilder: LocationFilterFormBuilder,
    private readonly apiLocationDetail: LocationDetailApi,
    private readonly selectAreasService: SelectAreasService,
    private readonly govProgramService: GovProgramService,
    private readonly accountService: AccountService
  ) {
    accountService.get().subscribe((user) => {
      this.user = user;
    });
    this.exportExcel = new EventEmitter<void>();
    this.filtersIsOpened = false;
    forkJoin([
      filterFormBuilder.build(),
      selectAreasService.areas(),
      govProgramService.list(),
      apiLocationDetail.govYears(),
    ]).subscribe(([form, areas, programs, govYears]) => {
      this.filterForm = form;
      this.programs = programs;
      this.govYears = govYears;
      this.filterForm.valueChanges.subscribe((value) => {
        this.filters.emit(value);
      });
      this.init.emit(this.filterForm.value);
    });
    this.filters = new EventEmitter<LocationFilters>();
  }

  get isGuest() {
    return !this.user || this.user.getRole().indexOf('GUEST') !== -1;
  }

  ngOnInit(): void {
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
    this.fAreas$ = this.selectAreasService.areas();
  }

  filterValue(): LocationFilters {
    return this.filterForm.value;
  }

  signalTypeControls(): FormArray {
    return this.filterForm.get('signalLevel') as FormArray;
  }

  connectionTypeControls(): FormArray {
    return this.filterForm.get('connectionType') as FormArray;
  }

  tvTypeControls(): FormArray {
    return this.filterForm.get('tvType') as FormArray;
  }

  postTypeControls(): FormArray {
    return this.filterForm.get('postType') as FormArray;
  }

  internetOperatorsControls(): FormArray {
    return this.filterForm.get('internetOperators') as FormArray;
  }

  cellularOperatorsControls(): FormArray {
    return this.filterForm.get('cellularOperators') as FormArray;
  }

  cellularQuality(): FormArray {
    return this.filterForm.get('quality') as FormArray;
  }

  getLocationTypeAndName(value: Location) {
    return `${value?.name} ${value?.type}`;
  }

  exportExcelClick(): void {
    this.exportExcel.emit();
  }

  resetFilters(): void {
    this.filterFormBuilder.build().subscribe((form) => {
      this.filterForm.setValue(form.value);
    });
  }
}
