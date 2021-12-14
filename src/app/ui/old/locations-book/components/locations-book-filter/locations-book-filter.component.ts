import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@core/models';
import { LocationServiceOrganizationAccessPointsWithFilterParams } from '@core/services/location.service';
import { removeEmpty } from '@core/utils/removeEmpty';
import { LocationsFullInformationService } from '@service/locations';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-locations-book-filter',
  templateUrl: './locations-book-filter.component.html',
  styleUrls: ['./locations-book-filter.component.scss'],
})
export class LocationsBookFilterComponent implements OnInit {
  filterForm: FormGroup;
  filtersIsOpened: boolean;
  initialValues;
  locations$: Observable<Location[]>;
  @Input() canBeParent = false;

  @Output() filters: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public serviceLocation: LocationServiceOrganizationAccessPointsWithFilterParams
  ) {
    this.buildForm();
  }
  private buildForm(): void {
    this.filterForm = this.fb.group({
      locations: null,
      parents: null,
      logicalCondition: 'AND',
    });
    this.initialValues = this.filterForm.value;
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
    this.locations$ = this.canBeParent
      ? this.serviceLocation.listParentLocations()
      : this.serviceLocation.listSimpleLocations();
  }

  resetFilters(): void {
    this.filterForm.reset(this.initialValues);
  }
}
