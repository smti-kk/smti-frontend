import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Deserialize, Serialize} from 'cerialize';
import {saveAs} from 'file-saver';

import {GovernmentProgram, InternetAccessType, Location, Organization, OrganizationType, PaginatedList, SmoType} from '@core/models';
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
import {waitForDebugger} from 'inspector';
import {LocationService} from './location.service';

const TYPES = `${environment.API_BASE_URL}/api/type/organization/`;
const SMO_TYPES = `${environment.API_BASE_URL}/api/type/smo/`;
const ORGANIZATIONS_REPORT = `${environment.API_BASE_URL}/api/organization/report/`;

interface OrganizationFilters {
  order: string[];
  location: Location;
  type: OrganizationType;
  smo: SmoType;
  parent: number[];
  organization: string;
  populationStart: number;
  populationEnd: number;
}

@Injectable()
export class OrganizationsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  listOrganizations(params?: HttpParams): Observable<PaginatedList<Organization>> {
    return this.httpClient
      .get<any>(ORGANIZATIONS_REPORT, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, Organization)),
          };
        })
      );
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

  updateAccessPoint(ap: Reaccesspoint): Observable<{}> {
    // todo: Определить тип, параметр приходит не организация, а any
    const item = Serialize(ap, Reaccesspoint);
    const url = ORGANIZATION_CREATE_AP.replace(':id', ap.organizationId.toString());
    return this.httpClient.put(url, item);
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

    // TODO: HINT:: https://stackoverflow.com/a/50887300
    this.httpClient.get<Blob>(url, {params, responseType: 'blob' as 'json', observe: 'response'})
      .subscribe(
        (response) => {
          const result: string = response.headers.get('Content-Disposition').match(/\"(.*)\"/)[1];
          saveAs(response.body, decodeURI(result));
        },
        error => {
          console.log(error);
        }
      );
  }

}


@Injectable()
export class OrganizationServiceWithFilterParams extends OrganizationsService {
  protected params: HttpParams = new HttpParams();

  protected filters: OrganizationFilters;

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Organization>> {
    return super.listOrganizations(
      this.params.set('page', page.toString()).set('size', pageSize.toString())
    );
  }

  filter(filters: OrganizationFilters) {
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parents', filters.parent);
    this.setOrganization('organization', filters.organization);
    // this.setContractor('contractor', filters.contractor);
    // this.setConnectionType('inet', filters.connectionType);
    this.setType('type', filters.type);
    this.setSmo('smo', filters.smo);
    // this.setContractType('contract', filters.contractType);
    this.populationStart('population-start', filters.populationStart);
    this.populationEnd('population-end', filters.populationEnd);
    // this.setPoint('ap', filters.point);
  }

/*
  setPoint(field: string, value: string[] | null) {
    if (value !== null && value.length !== 0) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
*/


  setType(field: string, value: OrganizationType) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  setSmo(field: string, value: SmoType) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

/*
  setContractType(field: string, value: GovernmentProgram) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
*/

  private setOrder(order?: string[]) {
    if (order) {
      this.params = this.params.set('sort', order.toString());
    } else {
      this.params = this.params.delete('sort');
    }
  }

/*
  exportExcel() {
    window.location.href = `${LOCATIONS_WITH_CONNECTION_POINTS}export/?${this.params.toString()}`;
  }
*/

  private setLocation(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setParent(field: string, value: number[]) {
    if (value && value.length > 0) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setOrganization(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

/*
  private setContractor(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }
*/

/*
  private setConnectionType(field: string, value: InternetAccessType) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
*/

  private populationStart(field: string, value: number) {
    if (value) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private populationEnd(field: string, value: number) {
    if (value) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
}
