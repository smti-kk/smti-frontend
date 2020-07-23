import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {LocationFilters} from './LocationFilters';
import {LocationFilterFormBuilder} from '@service/locations/LocationFilterForm';
import {forkJoin, Observable} from 'rxjs';
import {SelectAreaItem} from '@service/dto/SelectAreaItem';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {GovProgramService} from '@service/gov-program/GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';

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
  @Output() filters: EventEmitter<LocationFilters>;

  constructor(private readonly filterFormBuilder: LocationFilterFormBuilder,
              private readonly selectAreasService: SelectAreasService,
              private readonly govProgramService: GovProgramService) {
    this.filtersIsOpened = false;
    forkJoin([
      filterFormBuilder.build(),
      selectAreasService.areas(),
      govProgramService.list()
    ]).subscribe(([form, areas, programs]) => {
      this.filterForm = form;
      this.areas = areas;
      this.programs = programs;
      this.filterForm.valueChanges.subscribe(value => {
        this.filters.emit(value);
        console.log(value);
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
}
