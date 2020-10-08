import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {GovProgram} from '@api/dto/GovProgram';
import {LocationFilters} from '../../locations-page/location-filters/LocationFilters';
import {LocationFilterFormBuilder} from '@service/locations';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {forkJoin} from 'rxjs';
import {OrderingDirection} from '../../buttons/filter-btn/filter-btn.component';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {BaseStationFilterFormBuilder} from '@service/base-stations/BaseStationFilterFormBuilder';

@Component({
  selector: 'app-station-filters',
  templateUrl: './base-stations-filters.component.html',
  styleUrls: ['./base-stations-filters.component.scss']
})
export class BaseStationsFiltersComponent implements OnInit {
  filterForm: FormGroup;
  filtersIsOpened: boolean;
  @Output() filters: EventEmitter<LocationFilters>;
  @Output() exportExcel: EventEmitter<void>;

  constructor(private readonly filterFormBuilder: BaseStationFilterFormBuilder,
              private readonly apiLocationDetail: LocationDetailApi,
              private readonly selectAreasService: SelectAreasService,
              private readonly govProgramService: GovProgramService) {
    this.exportExcel = new EventEmitter<void>();
    this.filtersIsOpened = false;
    forkJoin([
      filterFormBuilder.build(),
      selectAreasService.areas(),
      govProgramService.list(),
      apiLocationDetail.govYears(),
    ]).subscribe(([form, areas, programs, govYears]) => {
      this.filterForm = form;
      this.filterForm.valueChanges.subscribe(value => {
        this.filters.emit(value);
      });
    });
    this.filters = new EventEmitter<LocationFilters>();
  }

  ngOnInit(): void {
  }

  filterValue(): LocationFilters {
    return this.filterForm.value;
  }

  signalTypeControls(): FormArray {
    return this.filterForm.get('typeMobiles') as FormArray;
  }

  cellularOperatorsControls(): FormArray {
    return this.filterForm.get('operatorIds') as FormArray;
  }

  exportExcelClick(): void {
    this.exportExcel.emit();
  }
}
