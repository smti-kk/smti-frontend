import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {LocationFilters} from './LocationFilters';
import {LocationFilterFormBuilder} from '@service/locations/LocationFilterForm';
import {forkJoin, Observable} from 'rxjs';
import {SelectAreaItem} from '@service/dto/SelectAreaItem';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {OrderingDirection} from '../../buttons/filter-btn/filter-btn.component';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';

@Component({
  selector: 'location-filters',
  templateUrl: './location-filters.component.html',
  styleUrls: ['./location-filters.component.scss']
})
export class LocationFiltersComponent implements OnInit {
  filterForm: FormGroup;
  areas: SelectAreaItem[];
  programs: GovProgram[];
  filtersIsOpened: boolean;
  OrderingDirection = OrderingDirection;
  govYears: number[];
  @Output() filters: EventEmitter<LocationFilters>;
  @Output() exportExcel: EventEmitter<void>;

  constructor(private readonly filterFormBuilder: LocationFilterFormBuilder,
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
      this.areas = areas;
      this.programs = programs;
      this.govYears = govYears;
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
