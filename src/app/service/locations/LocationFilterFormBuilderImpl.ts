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
            parent: new FormControl(filters.parent),
            govProgram: new FormControl(filters.govProgram),
            hasESPD: new FormControl(filters.hasESPD),
            hasSMO: new FormControl(filters.hasSMO),
            hasZSPD: new FormControl(filters.hasZSPD),
            logicalCondition: new FormControl(filters.logicalCondition),
            hasATS: new FormControl(filters.hasATS),
            hasPayphone: new FormControl(filters.hasPayphone),
            hasInfomat: new FormControl(filters.hasInfomat),
            hasRadio: new FormControl(filters.hasRadio),
            hasCellular: new FormControl(filters.hasCellular),
            hasInternet: new FormControl(filters.hasInternet),
            ordering: new FormControl(filters.hasInternet),
            govYear: new FormControl(filters.govYear),
            populationLeftBorder: new FormControl(filters.populationLeftBorder),
            populationRightBorder: new FormControl(filters.populationRightBorder),
            quality: this.buildFormArray(filters.quality),
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
