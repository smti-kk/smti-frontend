import { Injectable } from '@angular/core';
import { EditingRequestStatus } from 'src/app/api/dto/LocationFeatureEditingRequest';
import { LocationTableItem } from './../../../service/dto/LocationTableItem';
import { MunFilters } from './../mun-requests-filters/MunFilters';

type LocationTableItemWithFilters = LocationTableItem & {
  status?: EditingRequestStatus;
};
@Injectable({
  providedIn: 'root',
})
export class MunRequestsFilterService {
  filters: MunFilters;

  constructor() {}

  logicalFilter(...args: boolean[]) {
    const [val, ...newArgs] = args;
    if (newArgs.length) {
      return this.filters.logicalCondition === 'OR'
        ? val || this.logicalFilter(...newArgs)
        : val && this.logicalFilter(...newArgs);
    }
    return val;
  }

  requestsWithFilter(
    locations: LocationTableItemWithFilters[],
    filters: MunFilters
  ): LocationTableItemWithFilters[] {
    this.filters = filters;
    const isFilterEmpty =
      (Object.values(filters).filter((f) => f).length === 1 &&
        filters?.logicalCondition) ||
      this.filterEmptyProps(filters);

    if (isFilterEmpty) {
      return locations;
    }
    return this.filter(locations);
  }

  filter(
    locations: LocationTableItemWithFilters[]
  ): LocationTableItemWithFilters[] {
    return locations.filter((l) => {
      return this.logicalFilter(
        this.includesLocationId(this.filters['locationName'], l.id),
        this.includesParentLocation(this.filters['parents'], l.area.id)
      );
    });
  }

  includesLocationId(
    locationFilterItem: MunFilters['locationName'],
    locationId: number
  ): boolean {
    if (!locationFilterItem?.length) {
      return this.defaultFilterResponse;
    }
    return locationFilterItem.includes(locationId);
  }

  includesParentLocation(
    locationFilterItem: MunFilters['parents'],
    locationParentId: number
  ): boolean {
    if (!locationFilterItem?.length) {
      return this.defaultFilterResponse;
    }
    return locationFilterItem.includes(locationParentId);
  }

  filterEmptyProps(filter: MunFilters): boolean {
    return Object.values(filter).every(
      (x: any | any[]) => x === null || x === '' || !x?.length
    );
  }

  get defaultFilterResponse() {
    return this.filters?.logicalCondition !== 'OR';
  }
}
