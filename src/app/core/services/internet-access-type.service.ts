import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {InternetAccessType, Organization} from '@core/models';
import {Deserialize} from 'cerialize';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {INTERNET_ACCESS_TYPES} from '@core/constants/api';

@Injectable()
export class InternetAccessTypeService {
  constructor(private readonly httpClient: HttpClient) {}

  list(): Observable<InternetAccessType[]> {
    return this.httpClient
      .get(INTERNET_ACCESS_TYPES)
      .pipe(map(response => Deserialize(response, InternetAccessType)));
  }
}
