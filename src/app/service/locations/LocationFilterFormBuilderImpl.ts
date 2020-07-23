import {LocationFiltersInitialization} from './LocationFiltersInitialization';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LocationFilterFormBuilder} from './LocationFilterForm';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocationFilter} from '../../ui/locations-page/location-filters/LocationFilters';

export class LocationFilterFormBuilderImpl implements LocationFilterFormBuilder {
  constructor(private locationFiltersInitialization: LocationFiltersInitialization) {
  }

  build(): Observable<FormGroup> {
    return this.locationFiltersInitialization.init().pipe(
      map(filters => {
          return new FormGroup({
            signalLevel: this.buildFormArray(filters.signalLevel),
            connectionType: this.buildFormArray(filters.connectionType),
            tvType: this.buildFormArray(filters.tvType),
            postType: this.buildFormArray(filters.postType),
            internetOperators: this.buildFormArray(filters.internetOperators),
            cellularOperators: this.buildFormArray(filters.cellularOperators),
            location: new FormControl(''),
            parent: new FormControl(null),
            govProgram: new FormControl(null),
            hasESPD: new FormControl(false),
            hasSMO: new FormControl(false),
            hasZSPD: new FormControl(false),
            hasRSZO: new FormControl(false),
            logicalCondition: new FormControl('AND')
          });
        }
      ));
  }

  buildFormArray(values: LocationFilter[]): FormArray {
    return new FormArray(
      values.map(sl => {
        return new FormGroup({
          id: new FormControl(sl.id),
          isSelected: new FormControl(sl.isSelected),
          label: new FormControl(sl.label)
        });
      })
    );
  }
}
