import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Deserialize} from 'cerialize';
import {Location, InternetAccessType, OrganizationType, SmoType, GovernmentProgram} from '@core/models';
import {PaginatedList} from '@core/models/paginated-list';
import {OrderingFilter} from '@shared/layout/filter-btn/filter-btn.component';
import {OrderingDirection} from './tc-pivots.service';

const LOCATIONS_WITH_CONTRACTS =
  environment.API_BASE_URL + '/api/v1/report-organization-contracts/';
const LOCATIONS_SIMPLE = environment.API_BASE_URL + '/api/v1/location/locations/';
const LOCATIONS_PARENTS = environment.API_BASE_URL + '/api/v1/location/parents/';
const LOCATIONS_WITH_CONNECTION_POINTS = environment.API_BASE_URL + '/api/v1/report-organization/';

interface LocationWithContractsFilters {
  order: OrderingFilter;
  location: Location;
  parent: Location;
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
  parent: Location;
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

  listLocationsWithContracts(params?: HttpParams): Observable<PaginatedList<Location>> {
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

  listLocationsWithConnectionPoints(params?: HttpParams): Observable<PaginatedList<Location>> {
    return this.httpClient
      .get<any>(LOCATIONS_WITH_CONNECTION_POINTS, {params})
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
}

@Injectable()
export class LocationServiceContractsWithFilterParams extends LocationService {
  protected params: HttpParams = new HttpParams();
  protected filters: LocationWithContractsFilters;

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Location>> {
    return super.listLocationsWithContracts(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  filter(filters: LocationWithContractsFilters) {
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parent', filters.parent);
    this.setOrganization('organization', filters.organization);
    this.setContract('contract', filters.contract);
    this.setContractor('contractor', filters.contractor);
    this.setConnectionType('type', filters.connectionType);
  }

  exportExcel() {
    window.location.href = LOCATIONS_WITH_CONTRACTS + '/export/?' + this.params.toString();
  }
  private setOrder(order?: OrderingFilter) {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('ordering', '-' + order.name);
    } else {
      this.params = this.params.delete('ordering');
    }
  }
  private setLocation(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
  private setParent(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
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

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<Location>> {
    return super.listLocationsWithConnectionPoints(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  filter(filters: LocationWithOrganizationAccessPointsFilters) {
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parent', filters.parent);
    this.setOrganization('organization', filters.organization);
    this.setContractor('contractor', filters.contractor);
    this.setConnectionType('connection', filters.connectionType);
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
    window.location.href = LOCATIONS_WITH_CONNECTION_POINTS + '/export/?' + this.params.toString();
  }
  private setOrder(order?: OrderingFilter) {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('ordering', '-' + order.name);
    } else {
      this.params = this.params.delete('ordering');
    }
  }
  private setLocation(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
  }
  private setParent(field: string, value: Location) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
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
