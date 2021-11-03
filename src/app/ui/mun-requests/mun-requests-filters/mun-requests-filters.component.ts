import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {LocationsFullInformationService} from '@service/locations';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {LocationFilters} from 'src/app/ui/locations-page/location-filters/LocationFilters';
import {removeEmpty} from './../../old/core/utils/removeEmpty';

@Component({
  selector: 'mun-requests-filters',
  templateUrl: './mun-requests-filters.component.html',
  styleUrls: ['./mun-requests-filters.component.scss'],
})
export class MunRequestsFiltersComponent implements OnInit {
  filterForm: FormGroup;
  filtersIsOpened: boolean;
  initialValues;
  locations$: Observable<LocationTableItem[]>;

  @Input() showStatus?: boolean;

  @Output() filters: EventEmitter<LocationFilters> =
    new EventEmitter<LocationFilters>();

  constructor(
    private fb: FormBuilder,
    private readonly locationService: LocationsFullInformationService
  ) {
    this.buildForm();
  }
  private buildForm(): void {
    this.filterForm = this.fb.group({
      status: null,
      locationName: null,
      parents: null,
      logicalCondition: 'AND',
    });
    this.initialValues = this.filterForm.value
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        map((value) => removeEmpty(value)),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((value) => {
        this.filters.emit(value);
      });
    this.locations$ = this.locationService.listByUser();
  }

  resetFilters(): void {
    this.filterForm.reset(this.initialValues);
  }
}
