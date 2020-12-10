import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {LocationFilters} from './LocationFilters';
import {LocationFilterFormBuilder} from '@service/locations/LocationFilterForm';
import {forkJoin, Observable} from 'rxjs';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {Location} from "@core/models";
import {LocationServiceOrganizationAccessPointsWithFilterParams} from "@core/services/location.service";

@Component({
  selector: 'location-filters',
  templateUrl: './location-filters.component.html',
  styleUrls: ['./location-filters.component.scss']
})
export class LocationFiltersComponent implements OnInit {
  filterForm: FormGroup;
  programs: GovProgram[];
  filtersIsOpened: boolean;
  govYears: number[];

  fLocations$: Observable<Location[]>;

  @Output() filters: EventEmitter<LocationFilters>;
  @Output() init: EventEmitter<LocationFilters> = new EventEmitter<LocationFilters>();
  @Output() exportExcel: EventEmitter<void>;

  constructor(
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams,
    private readonly filterFormBuilder: LocationFilterFormBuilder,
    private readonly apiLocationDetail: LocationDetailApi,
    private readonly selectAreasService: SelectAreasService,
    private readonly govProgramService: GovProgramService
  ) {
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
      this.filterForm.valueChanges
      .subscribe(value => {
        this.filters.emit(value);
      });
      this.init.emit(this.filterForm.value);
    });
    this.filters = new EventEmitter<LocationFilters>();
  }

  ngOnInit(): void {
    this.fLocations$ = this.serviceLocation.listSimpleLocations();
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

  exportExcelClick(): void {
    this.exportExcel.emit();
  }

  resetFilters(): void {
    this.filterFormBuilder.build().subscribe(form => {
      this.filterForm.setValue(form.value);
    });
  }
}
