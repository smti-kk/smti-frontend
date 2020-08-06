import {LocationDetail, LocationFeaturesSaveRequest} from '../dto/LocationDetail';
import {Observable} from 'rxjs';
import {Pageable} from '@api/dto/Pageable';
import {HttpParams} from '@angular/common/http';
import {LocationProvidingInfo} from '@api/dto/LocationProvidingInfo';

export abstract class LocationDetailApi {
  abstract list(page: number, size: number): Observable<Pageable<LocationDetail[]>>;
  abstract listFiltered(page: number, size: number, filters: HttpParams): Observable<Pageable<LocationDetail[]>>;
  abstract one(id: number): Observable<LocationDetail>;
  abstract save(location: LocationFeaturesSaveRequest): Observable<LocationDetail>;
  abstract govYears(): Observable<number[]>;
  abstract locationProvidingInfo(locationId: number): Observable<LocationProvidingInfo>;
  abstract exportExcel(locations: number[]): Observable<void>;
}
