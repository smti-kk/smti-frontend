import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize, Serialize} from 'cerialize';
import {saveAs} from 'file-saver';

import {Organization, OrganizationType, SmoType} from '@core/models';
import {
  ORGANIZATION_AP,
  ORGANIZATION_CREATE_AP,
  ORGANIZATION_EDIT,
  ORGANIZATION_INIT_MONITORING_AP, ORGANIZATION_REPORT_MONITORING,
  ORGANIZATION_SAVE,
  ORGANIZATIONS,
} from '@core/constants/api';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {environment} from 'src/environments/environment';
// import {waitForDebugger} from 'inspector';

const TYPES = `${environment.API_BASE_URL}/api/type/organization/`;
const SMO_TYPES = `${environment.API_BASE_URL}/api/type/smo/`;

@Injectable()
export class OrganizationsService {

  constructor(private readonly httpClient: HttpClient) {
  }

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
    const url = ORGANIZATION_INIT_MONITORING_AP
      .replace(':id', String(orgid))
      .replace(':apid', String(apid));
    return this.httpClient.post(url, foo);
  }

  reportMonitoring(start: number, end: number): void {
    const url = ORGANIZATION_REPORT_MONITORING;

    const params = new HttpParams().set('start', start.toString()).set('end', end.toString());

    this.httpClient.get(url, {params, responseType: 'blob', observe: 'response'})
      .subscribe(
        (response) => {
          saveAs(response, response.headers.get('content-disposition'));
        },
        error => {
          console.log(error);
        }
      );
  }

  reportMonitoring2(start: number, end: number, filename: string = null): void {
    const url = ORGANIZATION_REPORT_MONITORING;

    const params = new HttpParams().set('start', start.toString()).set('end', end.toString());

    // HINT::https://stackoverflow.com/questions/53284400/download-a-file-using-angular-6-and-spring-rest-api
    this.httpClient.get(url, {params, responseType: 'blob', observe: 'response'}).subscribe((res) => {
      // @ts-ignore
      const file = new Blob([res], {
        type: 'application/octet-stream',
      });
      const a = document.createElement('a');
      a.href = url+"?"+params.toString();// + (<any> res)._body;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      return res;
    }, error => {
      let alert: any = {
        title: 'Notify Title',
        body: 'Notify Body',
      };
      alert.body = error.error.message || JSON.stringify(error.error);
      alert.title = error.error.error;
      // alert = this.alertService.handleError(error);
      alert.position = 'rightTop';
      console.log(error);
      // this.alertService.notifyError(alert);
      return error;
    });
  }


}
