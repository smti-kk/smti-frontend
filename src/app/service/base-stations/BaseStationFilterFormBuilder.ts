import {Injectable} from '@angular/core';
import {LocationFiltersInitialization} from '../locations';
import {Observable} from 'rxjs';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {LocationFilter} from '../../ui/locations-page/location-filters/LocationFilters';

@Injectable({
  providedIn: 'root'
})
export class BaseStationFilterFormBuilder {
  constructor(private locationFiltersInitialization: LocationFiltersInitialization) {
  }

  build(): Observable<FormGroup> {
    return this.locationFiltersInitialization.init().pipe(
      map(filters => {
          return new FormGroup({
            typeMobiles: this.buildFormArray(filters.signalLevel),
            operatorIds: this.buildFormArray(filters.cellularOperators),
            address: new FormControl(''),
            parent: new FormControl(filters.parent),
            coverageRadiusLeftBorder: new FormControl(null),
            coverageRadiusRightBorder: new FormControl(null),
            propHeightLeftBorder: new FormControl(null),
            propHeightRightBorder: new FormControl(null),
            actionDateFrom: new FormControl(null),
            actionDateTo: new FormControl(null),
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
          label: new FormControl(sl.label),
          name: new FormControl(sl.name)
        });
      })
    );
  }
}
