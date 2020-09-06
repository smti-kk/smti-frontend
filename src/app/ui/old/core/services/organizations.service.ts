import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize, Serialize} from 'cerialize';

import {Organization, OrganizationType, SmoType} from '@core/models';
import {
  ORGANIZATION_AP,
  ORGANIZATION_CREATE_AP,
  ORGANIZATION_EDIT,
  ORGANIZATION_INIT_MONITORING_AP,
  ORGANIZATION_SAVE,
  ORGANIZATIONS,
} from '@core/constants/api';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {environment} from 'src/environments/environment';
import {waitForDebugger} from 'inspector';

const TYPES = `${environment.API_BASE_URL}/api/type/organization/`;
const SMO_TYPES = `${environment.API_BASE_URL}/api/type/smo/`;

@Injectable()
export class OrganizationsService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(location: number): Observable<Organization[]> {
    const params = new HttpParams().append('location', location.toString());

    return this.httpClient
      .get(ORGANIZATIONS, {params})
      .pipe(map(response => Deserialize(response, Organization)));
  }

  getPoints(id: string): Observable<Reaccesspoint[]> {
    return this.httpClient.get(ORGANIZATION_AP.replace(':id', id))
    .pipe(map(response => Deserialize(response, Reaccesspoint)));
  }

  getByIdentifier(id: string): Observable<Organization> {
    return this.httpClient
      .get(ORGANIZATION_EDIT.replace(':id', id))
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

  put(value): Observable<Organization> {
    const id = value._id;
    const url = ORGANIZATION_EDIT.replace(':id', id.toString());
    const sdata = Serialize(value, Organization); // todo: Перенести сериализацию в конец
    if (sdata.type_smo === undefined) {
      // TODO какого хера сериализатор вместо null устанавливает undefined
      sdata.type_smo = null;
    }
    if (sdata.type === undefined) {
      // TODO какого хера сериализатор вместо null устанавливает undefined
      sdata.type = null;
    }

    return this.httpClient
      .put<Organization>(url, sdata)
      .pipe(map(response => Deserialize(response, Organization)));
  }

  save(organization: Organization): Observable<{}> {
    // todo: Определить тип, параметр приходит не организация, а any
    const orgSer = Serialize(organization, Organization);

    return this.httpClient.post(ORGANIZATION_SAVE, orgSer);
  }

  createAccessPoint(ap: Reaccesspoint): Observable<{}> {
    // todo: Определить тип, параметр приходит не организация, а any
    const item = Serialize(ap, Reaccesspoint);
    const url = ORGANIZATION_CREATE_AP.replace(':id', ap.organizationId.toString());
    return this.httpClient.post(url, item);
  }

  initMonitoring(apid: number, orgid: number, foo: any): Observable<{}> {
    // todo: Определить тип, параметр приходит не организация, а any
    // console.log('service::ap:: ' + apid);
    // console.log('service::org:: ' + orgid);
    // console.log('service::foo:: ' + foo);
    // debugger;
    // const item = Serialize(ap, Reaccesspoint);
    const url = ORGANIZATION_INIT_MONITORING_AP
      .replace(':id', String(orgid))
      .replace(':apid', String(apid));
    return this.httpClient.post(url, foo);
    // return null;
  }
}
