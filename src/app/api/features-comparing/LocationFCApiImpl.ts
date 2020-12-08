import {Observable} from 'rxjs';
import {LocationFC} from '../dto/LocationFC';
import {LocationFCApi} from './LocationFCApi';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LOCATION_FC_API} from '../../../environments/api.routes';
import {Pageable} from '@api/dto/Pageable';
import {TechnicalCapabilityType} from '@api/dto/TechnicalCapabilityType';
import {map, tap} from 'rxjs/operators';
import {saveAs} from 'file-saver';


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

  locationsFiltered(
    page: number,
    size: number,
    type: TechnicalCapabilityType,
    ordering?: LocationOrdering,
    parentIds?: number[],
    locationName?: string | string[],
    operators?: number[],
    connectionTypes?: number[],
    govProgram?: number,
    govProgramYear?: number,
    hasAnyInternet?: boolean
  ): Observable<Pageable<LocationFC[]>> {
    let params = this.filterParams(
      ordering,
      parentIds,
      locationName,
      operators,
      connectionTypes,
      govProgram,
      govProgramYear,
      hasAnyInternet
    );
    params = params
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Pageable<LocationFC[]>>(LOCATION_FC_API + '/' + type, {params});
  }

  locationsExportExcel(type: TechnicalCapabilityType,
                       ordering?: LocationOrdering,
                       parentIds?: number[],
                       locationName?: string,
                       operators?: number[],
                       connectionTypes?: number[],
                       govProgram?: number,
                       govProgramYear?: number,
                       hasAnyInternet?: boolean): Observable<void> {
    const params = this.filterParams(
      ordering,
      parentIds,
      locationName,
      operators,
      connectionTypes,
      govProgram,
      govProgramYear,
      hasAnyInternet
    );
    return this.http.get(LOCATION_FC_API + '/' + type + '/export-excel', {params, observe: 'response', responseType: 'blob'})
      .pipe(
        map(response => {
          const result: string = response.headers.get('Content-Disposition').match(/\"(.*)\"/)[1];
          saveAs(response.body, decodeURI(result));
        })
      );
  }

  private filterParams(
    ordering?: LocationOrdering,
    parentIds?: number[],
    locationName?: string | string[],
    operators?: number[],
    connectionTypes?: number[],
    govProgram?: number,
    govProgramYear?: number,
    hasAnyInternet?: boolean
  ): HttpParams {
    let params = new HttpParams();
    if (ordering) {
      params = params.append('sort', ordering);
    }
    if (parentIds && parentIds.length > 0) {
      params = params.append('parents', parentIds.join(','));
    }
    if (locationName && locationName.length > 0) {
      if(typeof locationName === 'string'){
        params = params.append('locationName', locationName);
      }
      else {
        for (let i = 0; i < locationName.length; i++){
          params = params.append('locationName', locationName[i]);
        }
      }
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
    return params;
  }
}
