import {LocationTableItem} from '../dto/LocationTableItem';
import {LocationsFullInformationService} from './LocationsFullInformationService';
import {forkJoin, Observable} from 'rxjs';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {map} from 'rxjs/operators';
import {LocationTableItemConverter} from '@service/locations/LocationTableItemConverter';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {Pageable} from '@api/dto/Pageable';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {FiltersToHttpParamsConverter} from '@service/locations/FiltersToHttpParamsConverter';

export class LocationsFullInformationServiceImpl implements LocationsFullInformationService {
  private readonly locationDetailApi: LocationDetailApi;
  private readonly locationTableItemConverter: LocationTableItemConverter;
  private readonly operatorsApi: OperatorsApi;
  private readonly filtersToHttpParamsConverter: FiltersToHttpParamsConverter;


  constructor(locationDetailApi: LocationDetailApi,
              locationTableItemConverter: LocationTableItemConverter,
              operatorsApi: OperatorsApi,
              filtersToHttpParamsConverter: FiltersToHttpParamsConverter) {
    this.locationDetailApi = locationDetailApi;
    this.locationTableItemConverter = locationTableItemConverter;
    this.operatorsApi = operatorsApi;
    this.filtersToHttpParamsConverter = filtersToHttpParamsConverter;
  }

  get(page: number, size: number): Observable<Pageable<LocationTableItem[]>> {
    return forkJoin([
      this.operatorsApi.get(),
      this.locationDetailApi.list(page, size)
    ]).pipe(
      map(([operators, locations]) => {
        return {
          content: locations.content
            .map(l => this.locationTableItemConverter.convert(l, operators))
            .sort((l1, l2) => {
              if (l1.area.name > l2.area.name) {
                return 1;
              } else {
                return -1;
              }
            }),
          totalElements: locations.totalElements
        };
      })
    );
  }

  filteredLocations(page: number, size: number, filters?: LocationFilters): Observable<Pageable<LocationTableItem[]>> {
    return forkJoin([
      this.operatorsApi.get(),
      this.locationDetailApi.listFiltered(page, size, this.filtersToHttpParamsConverter.convert(filters))
    ]).pipe(
      map(([operators, locations]) => {
        return {
          content: locations.content
            .map(l => this.locationTableItemConverter.convert(l, operators))
            .sort((l1, l2) => {
              return l1.area.name > l2.area.name ? -1 : 1;
            }),
          totalElements: locations.totalElements
        };
      })
    );
  }

  exportExcel(): void {
    // todo: implement
    this.locationDetailApi.exportExcel([]);
  }

  listByUser(): Observable<LocationTableItem[]> {
    return forkJoin([
      this.operatorsApi.get(),
      this.locationDetailApi.listByUser()
    ]).pipe(
      map(([operators, locations]) => {
        return locations.map(l => this.locationTableItemConverter.convert(l, operators));
      })
    );
  }
}
