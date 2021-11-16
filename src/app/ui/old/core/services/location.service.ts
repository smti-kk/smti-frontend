/* eslint-disable */  // todo: refactor file
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Deserialize} from 'cerialize';

import {GovernmentProgram, InternetAccessType, Location, OrganizationType, SmoType,} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {OrderingFilter} from '@shared/layout/value-accessors/filter-btn/filter-btn.component';

import {environment} from '../../../environments/environment';
import {OrderingDirection} from './tc-pivots.service';
import {Reaccesspoint} from '@core/models/reaccesspoint';
import {Contract} from '@core/models/contract';
import {formatDate} from '@angular/common';
import {APStateType} from 'src/app/ui/old/connection-points/connection-points/connection-points.component';
import {saveAs} from 'file-saver';

const LOCATIONS_WITH_CONTRACTS = `${environment.API_BASE_URL}/api/report/organization/ap-contract/`;
const LOCATIONS_WITH_CONNECTION_POINTS = `${environment.API_BASE_URL}/api/report/organization/ap-all/`;
const LOCATIONS_SIMPLE = `${environment.API_BASE_URL}/api/location/locations/`;
const LOCATIONS_PARENTS = `${environment.API_BASE_URL}/api/location/parents/`;
const LOCATIONS_ALL = `${environment.API_BASE_URL}/api/location/`;

interface LocationWithContractsFilters {
  order: OrderingFilter;
  location: Location | Location[];
  type: OrganizationType;
  smo: SmoType;
  parent: number[];
  organization: string;
  contract: string;
  contractor: string;
  connectionType: InternetAccessType;
  contractStart: string;
  contractEnd: string;
  populationStart: number;
  populationEnd: number;
  logicalCondition?: string;
}

interface LocationWithOrganizationAccessPointsFilters {
  order: string[];
  location: Location | Location[];
  type: OrganizationType;
  smo: SmoType;
  parent: number[];
  organization: string;
  contractor: string;
  connectionType: InternetAccessType;
  contractType: GovernmentProgram; // possible
  populationStart: number;
  populationEnd: number;
  point: string[];
  address?: string;
  state?: APStateType;
  logicalCondition?: string;
}

@Injectable()
export class LocationService {
  constructor(protected httpClient: HttpClient) {}

  getLocationByName(name: string): Observable<Location[]> {

    const params = new HttpParams().set('location', name);

    return this.httpClient
      .get(LOCATIONS_ALL, {params})
      .pipe(map(response => Deserialize(response, Location)));
  }

  listSimpleLocations(): Observable<Location[]> {
    return this.httpClient
      .get(LOCATIONS_SIMPLE)
      .pipe(map(response => Deserialize(response, Location)));
  }

  listParentLocations(): Observable<Location[]> {
    return this.httpClient
      .get(LOCATIONS_PARENTS)
      .pipe(map(response => Deserialize(response, Location)));
  }

  listLocationsWithContracts(params?: HttpParams): Observable<PaginatedList<Contract>> {
    return this.httpClient
      .get<any>(LOCATIONS_WITH_CONTRACTS, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, Contract)),
          };
        })
      );
  }

  listLocationsWithConnectionPoints(params?: HttpParams): Observable<PaginatedList<Reaccesspoint>> {
    return this.httpClient
      .get<any>(LOCATIONS_WITH_CONNECTION_POINTS, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, Reaccesspoint)),
          };
        })
      );
  }
}

@Injectable()
export class LocationServiceContractsWithFilterParams extends LocationService {
  protected params: HttpParams = new HttpParams();

  protected filters: LocationWithContractsFilters;

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Contract>> {
    return super.listLocationsWithContracts(
      this.params.set('page', page.toString()).set('size', pageSize.toString())
    );
  }

  filter(filters: LocationWithContractsFilters) {
    this.params = new HttpParams();
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parents', filters.parent);
    this.setOrganization('organization', filters.organization);
    this.setContract('contract', filters.contract);
    this.setContractor('contractor', filters.contractor);
    this.setType('type', filters.type);
    this.setSmo('smo', filters.smo);
    this.setConnectionType('inet', filters.connectionType);
    this.setContractStart('contract-start', filters.contractStart);
    this.setContractEnd('contract-end', filters.contractEnd);
    this.populationStart('population-start', filters.populationStart);
    this.populationEnd('population-end', filters.populationEnd);
    this.setLogicalCondition('logicalCondition', filters.logicalCondition);
  }

  exportExcel() {
    window.location.href = `${LOCATIONS_WITH_CONTRACTS}export/?${this.params.toString()}`;
  }

  setLogicalCondition(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

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

  private setOrder(order?: OrderingFilter) {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('sort', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('sort', `-${order.name}`);
    } else {
      this.params = this.params.delete('sort');
    }
  }

  private setLocation(field: string, value: Location | Location[]) {
    if (!value) {return}

    if(Array.isArray(value)){
      for (let i = 0; i < value.length; i++){
        this.params = this.params.append(field, value[i].id.toString());
      }
    }
    else {
      this.params = this.params.append(field, value.id.toString());
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

  private setContract(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setContractor(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setConnectionType(field: string, value: InternetAccessType) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setContractStart(field: string, value: string) {
    if (value) {
      const date = formatDate(value, 'yyyy-MM-dd', 'ru-RU');
      this.params = this.params.set(field, date);
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setContractEnd(field: string, value: string) {
    if (value) {
      const date = formatDate(value, 'yyyy-MM-dd', 'ru-RU');
      this.params = this.params.set(field, date);
    } else {
      this.params = this.params.delete(field);
    }
  }

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

@Injectable()
export class LocationServiceOrganizationAccessPointsWithFilterParams extends LocationService {
  protected params: HttpParams = new HttpParams();

  protected filters: LocationWithOrganizationAccessPointsFilters;

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Reaccesspoint>> {
    return super.listLocationsWithConnectionPoints(
      this.params.set('page', page.toString()).set('size', pageSize.toString())
    );
  }

  filter(filters: LocationWithOrganizationAccessPointsFilters) {
    this.params = new HttpParams();
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parents', filters.parent);
    this.setOrganization('organization', filters.organization);
    this.setContractor('contractor', filters.contractor);
    this.setConnectionType('inet', filters.connectionType);
    this.setType('type', filters.type);
    this.setSmo('smo', filters.smo);
    this.setContractType('contract', filters.contractType);
    this.populationStart('population-start', filters.populationStart);
    this.populationEnd('population-end', filters.populationEnd);
    this.setPoint('ap', filters.point);
    this.setAddress('address', filters.address);
    this.setLogicalCondition('logicalCondition', filters.logicalCondition);
    this.setAccessPointState('state',filters.state);

  }

  setAddress(field: string, value: string | null) {
    if (value !== null && value.length !== 0) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  setLogicalCondition(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

  setAccessPointState(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

  setPoint(field: string, value: string[] | null) {
    if (value !== null && value.length !== 0) {
      this.params = this.params.set(field, value.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }


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

  setContractType(field: string, value: GovernmentProgram) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  exportExcel(): Observable<any> {
    return this.httpClient.get(`${LOCATIONS_WITH_CONNECTION_POINTS}export/`, {params: this.params, responseType: 'blob', observe: 'response'})
      .pipe(
        tap(response => {
          const result: string = response.headers.get('Content-Disposition').match(/\"(.*)\"/)[1];
          saveAs(response.body, decodeURI(result));
        })
      );
  }

  private setOrder(order?: string[]) {
    if (order) {
      this.params = this.params.set('sort', order.toString());
    } else {
      this.params = this.params.delete('sort');
    }
  }

  private setLocation(field: string, value: Location[] | Location) {
    if (!value) {return}

    if(Array.isArray(value)){
      for (let i = 0; i < value.length; i++){
        this.params = this.params.append(field, value[i].id.toString());
      }
    }
    else {
      this.params = this.params.append(field, value.id.toString());
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

  private setContractor(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setConnectionType(field: string, value: InternetAccessType) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

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
