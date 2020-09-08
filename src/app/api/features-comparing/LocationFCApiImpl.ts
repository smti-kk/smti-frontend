import {Observable} from 'rxjs';
import {LocationFC} from '../dto/LocationFC';
import {LocationFCApi} from './LocationFCApi';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LOCATION_FC_API} from '../../../environments/api.routes';
import {Pageable} from '@api/dto/Pageable';
import {TechnicalCapabilityType} from "@api/dto/TechnicalCapabilityType";

export type LocationOrdering =
  'name,asc'
  | 'name,desc'
  | 'locationParent.name,asc'
  | 'locationParent.name,desc'
  | 'population,asc'
  | 'population,desc';

export class LocationFCApiImpl implements LocationFCApi {
  constructor(private readonly http: HttpClient) {
  }

  locations(page: number, size: number): Observable<Pageable<LocationFC[]>> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    return this.http.get<Pageable<LocationFC[]>>(LOCATION_FC_API, {params});
  }

  makeItActive(locationId: number, featureId: number): Observable<void> {
    return this.http.post<void>(LOCATION_FC_API + `/${locationId}/${featureId}/activation`, {});
  }

  locationsFiltered(page: number,
                    size: number,
                    type: TechnicalCapabilityType,
                    ordering?: LocationOrdering,
                    parentIds?: number[],
                    locationName?: string,
                    operators?: number[],
                    connectionTypes?: number[],
                    govProgram?: number,
                    govProgramYear?: number,
                    hasAnyInternet?: boolean): Observable<Pageable<LocationFC[]>> {
    let params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: size.toString()
      }
    });
    if (ordering) {
      params = params.append('sort', ordering);
    }
    if (parentIds && parentIds.length > 0) {
      params = params.append('parents', parentIds.join(','));
    }
    if (locationName && locationName.length > 0) {
      params = params.append('locationName', locationName);
    }
    if (operators && operators.length > 0) {
      params = params.append('operators', operators.join(','));
    }
    if (connectionTypes && connectionTypes.length > 0) {
      params = params.append('connectionTypes', connectionTypes.join(','));
    }
    if (govProgram) {
      params = params.append('govProgram', govProgram.toString());
    }
    if (govProgramYear) {
      params = params.append('govProgramYear', govProgramYear.toString());
    }
    if (hasAnyInternet !== null && hasAnyInternet !== undefined) {
      params = params.append('hasAnyInternet', hasAnyInternet === true ? 'true' : 'false');
    }
    return this.http.get<Pageable<LocationFC[]>>(LOCATION_FC_API + '/' + type, {params});
  }
}
