/* eslint-disable */ // todo: refactor file
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';

import {
  Location,
  InternetAccessType,
  OrganizationType,
  SmoType,
  GovernmentProgram, Organization,
} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {OrderingFilter} from '@shared/layout/value-accessors/filter-btn/filter-btn.component';

import {environment} from '../../../environments/environment';
import {OrderingDirection} from './tc-pivots.service';
import {Reaccesspoint} from '@core/models/reaccesspoint';

const LOCATIONS_WITH_CONTRACTS = `${environment.API_BASE_URL}/api/v1/report-organization-contracts/`;
const LOCATIONS_WITH_CONNECTION_POINTS = `${environment.API_BASE_URL}/api/report/organization/ap-all/`;
const LOCATIONS_SIMPLE = `${environment.API_BASE_URL}/api/location/locations/`;
const LOCATIONS_PARENTS = `${environment.API_BASE_URL}/api/location/parents/`;

interface LocationWithContractsFilters {
  order: OrderingFilter;
  location: Location;
  type: OrganizationType;
  smo: SmoType;
  parent: number[];
  organization: string;
  contract: string;
  contractor: string;
  connectionType: InternetAccessType;
}

interface LocationWithOrganizationAccessPointsFilters {
  order: OrderingFilter;
  location: Location;
  type: OrganizationType;
  smo: SmoType;
  parent: number[];
  organization: string;
  contractor: string;
  connectionType: InternetAccessType;
  contractType: GovernmentProgram; // possible
}

@Injectable()
export class LocationService {
  constructor(private httpClient: HttpClient) {}

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

  listLocationsWithContracts(params?: HttpParams): Observable<PaginatedList<Organization>> {
    return this.httpClient
      .get<any>(LOCATIONS_WITH_CONTRACTS, {params})
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(item => Deserialize(item, Location)),
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

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Organization>> {
    return super.listLocationsWithContracts(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  filter(filters: LocationWithContractsFilters) {
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
  }

  exportExcel() {
    window.location.href = `${LOCATIONS_WITH_CONTRACTS}export/?${this.params.toString()}`;
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

  private setLocation(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setParent(field: string, value: number[]) {
    if (value) {
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

  exportExcel() {
    window.location.href = `${LOCATIONS_WITH_CONNECTION_POINTS}export/?${this.params.toString()}`;
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

  private setLocation(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }

  private setParent(field: string, value: number[]) {
    if (value) {
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
}
