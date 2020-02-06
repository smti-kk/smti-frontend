import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Organization, OrganizationType, SmoType} from '@core/models';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {ORGANIZATIONS, ORGANIZATION} from '@core/constants/api';
import {environment} from 'src/environments/environment';

const TYPES = environment.API_BASE_URL + '/api/v1/organization-types/';
const SMO_TYPES = environment.API_BASE_URL + '/api/v1/organization-smo-types/';

@Injectable()
export class OrganizationsService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(location: number): Observable<Organization[]> {
    const params = new HttpParams().append('location', location.toString());

    return this.httpClient
      .get(ORGANIZATIONS, {params})
      .pipe(map(response => Deserialize(response, Organization)));
  }

  getByIdentifier(id: string): Observable<Organization> {
    return this.httpClient
      .get(ORGANIZATION.replace(':id', id))
      .pipe(map(response => Deserialize(response, Organization)));
  }

  getTypes(): Observable<OrganizationType[]> {
    return this.httpClient
      .get(TYPES)
      .pipe(map(response => Deserialize(response, OrganizationType)));
  }

  getSMOTypes(): Observable<SmoType[]> {
    return this.httpClient.get(SMO_TYPES).pipe(map(response => Deserialize(response, SmoType)));
  }
}
