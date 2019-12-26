import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocationArea} from '@map-wrapper/model/location-area';
import {LOCATION_AREA_URL} from '@map-wrapper/constants/api.constants';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {Observable} from 'rxjs';

@Injectable()
export class MunicipalityService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<LocationArea[]> {
    return this.httpClient
      .get(LOCATION_AREA_URL)
      .pipe(map(response => Deserialize(response, LocationArea)));
  }
}
