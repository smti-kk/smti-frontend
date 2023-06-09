import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location, Organization, OrganizationType, PaginatedList, SmoType} from '../models';
import {OrganizationsService} from './organizations.service';
import { FunCustomer } from '@core/models/funCustomer';

interface OrganizationFilters {
  order: string[];
  location: Location | Location[];
  type: OrganizationType;
  funCustomer: FunCustomer
  parent: number[];
  organization: string;
  populationStart: number;
  populationEnd: number;
  logicalCondition?: string;
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
    this.params = new HttpParams();
    this.filters = filters;
    this.setOrder(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parents', filters.parent);
    this.setOrganization('organization', filters.organization);
    // this.setContractor('contractor', filters.contractor);
    // this.setConnectionType('inet', filters.connectionType);
    this.setType('type', filters.type);
    this.setFunCustomer('funCustomer', filters.funCustomer);
    // this.setContractType('contract', filters.contractType);
    this.populationStart('population-start', filters.populationStart);
    this.populationEnd('population-end', filters.populationEnd);
    this.setLogicalCondition('logicalCondition', filters.logicalCondition);
    // this.setPoint('ap', filters.point);
  }
  setFunCustomer(field: string, value: any) {
    if (value) {
      this.params = this.params.set(field, value.id.toString());
    } else {
      this.params = this.params.delete(field);
    }
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

  setLogicalCondition(field: string, value: string) {
    if (value) {
      this.params = this.params.set(field, value);
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
