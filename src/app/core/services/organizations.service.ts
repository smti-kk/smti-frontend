import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Organization} from '@core/models';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {ORGANIZATIONS} from '@core/constants/api';

@Injectable()
export class OrganizationsService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(location: number): Observable<Organization[]> {
    const params = new HttpParams().append('location', location.toString());

    return this.httpClient
      .get(ORGANIZATIONS, {params})
      .pipe(map(response => Deserialize(response, Organization)));
  }
}
