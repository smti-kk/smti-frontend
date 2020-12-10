import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {GovProgram} from '@api/dto/GovProgram';
import {LocationFilters} from '../../locations-page/location-filters/LocationFilters';
import {LocationFilterFormBuilder} from '@service/locations';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {forkJoin, Observable} from 'rxjs';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {LocationServiceOrganizationAccessPointsWithFilterParams} from "@core/services/location.service";
import {Location} from "@core/models";

@Component({
  selector: 'app-location-comparing-filters',
  templateUrl: './location-comparing-filters.component.html',
  styleUrls: ['./location-comparing-filters.component.scss']
})
export class LocationComparingFiltersComponent implements OnInit {
  filterForm: FormGroup;
  programs: GovProgram[];
  filtersIsOpened: boolean;
  govYears: number[];
  fLocations$: Observable<Location[]>;
  @Output() filters: EventEmitter<LocationFilters>;
  @Output() init: EventEmitter<LocationFilters> = new EventEmitter<LocationFilters>();
  @Output() exportExcel: EventEmitter<void>;
  @Input() type: TechnicalCapabilityType;

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
      this.filterForm.valueChanges.subscribe(value => {
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

}
