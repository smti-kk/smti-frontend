import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  GovernmentProgram, Location,
  LocationFeatures,
  MailType,
  MobileGeneration,
  PaginatedList,
  TrunkChannel,
} from '@core/models';
import {OrderingFilter} from '@shared/layout/value-accessors/filter-btn/filter-btn.component';
import {Signal} from '@core/models/signal';
import {OrderingDirection, TcPivotsService} from '@core/services/tc-pivots.service';

interface TcFilters {
  order: OrderingFilter;
  program: GovernmentProgram;
  hasEspd: boolean;
  hasPayphone: boolean;
  hasInfomat: boolean;
  hasRadio: boolean;
  hasTelephone: boolean;
  mailType: MailType;
  tvType: Signal;
  internet: {[providerId: string]: boolean}[];
  mobile: {[providerId: string]: boolean}[];
  mobileType: MobileGeneration;
  internetType: TrunkChannel;
  locationName: string;
  location: Location;
  parent: Location;
}

@Injectable()
export class FilterTcPivotsService extends TcPivotsService {
  protected params: HttpParams = new HttpParams();

  protected filters: TcFilters;

  private TRUE = '2';

  paginatedList(page: number, pageSize: number): Observable<PaginatedList<LocationFeatures>> {
    return super.list(
      this.params.set('page', page.toString()).set('page_size', pageSize.toString())
    );
  }

  filter(filters: TcFilters): void {
    this.filters = filters;

    this.setFilterByProgram(filters.program);
    this.setFilterOrdering(filters.order);
    this.setLocation('location', filters.location);
    this.setParent('parent', filters.parent);
    this.setFilterBoolean('ats', filters.hasTelephone);
    this.setFilterBoolean('payphone', filters.hasPayphone);
    this.setFilterBoolean('infomat', filters.hasInfomat);
    this.setFilterBoolean('radio', filters.hasRadio);
    this.setFilterByMailType(filters.mailType);
    this.setFilterByTvType(filters.tvType);
    this.setInternetOperatorFilter(filters.internet);
    this.setMobileOperatorFilter(filters.mobile);
    this.setMobileTypeFilter(filters.mobileType);
    this.setInternetTypeFilter(filters.internetType);
    this.setLocationFilter(filters.locationName);
  }

  exportExcel(): void {
    TcPivotsService.exportExcel(this.params);
  }

  protected setFilterOrdering(order?: OrderingFilter): void {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('ordering', `-${order.name}`);
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

  private setFilterByProgram(value: GovernmentProgram): void {
    if (value) {
      this.params = this.params.set('govenmet_programs', value.id.toString());
    } else {
      this.params = this.params.delete('govenmet_programs');
    }
  }

  private setFilterBoolean(field: string, value: boolean): void {
    if (value === true) {
      this.params = this.params.set(field, this.TRUE);
    } else if (this.params.has(field)) {
      this.params = this.params.delete(field);
    }
  }

  private setFilterByMailType(type: MailType): void {
    if (type) {
      this.params = this.params.set('post_type', type.toString());
    } else {
      this.params = this.params.delete('post_type');
    }
  }

  private setFilterByTvType(type: Signal): void {
    if (type) {
      this.params = this.params.set('tv_type', type.id.toString());
    } else {
      this.params = this.params.delete('tv_type');
    }
  }

  private setMobileOperatorFilter(providers: {[providerId: string]: boolean}[]): void {
    if (!providers) {
      return;
    }

    this.params = this.params.delete('mobile_operator');

    providers
      .filter(provider => Object.values(provider)[0] === true)
      .forEach(provider => {
        this.params = this.params.append('mobile_operator', Object.keys(provider)[0]);
      });
  }

  private setInternetOperatorFilter(providers: {[providerId: string]: boolean}[]): void {
    if (!providers) {
      return;
    }

    this.params = this.params.delete('internet_operator');

    providers
      .filter(provider => Object.values(provider)[0] === true)
      .forEach(provider => {
        this.params = this.params.append('internet_operator', Object.keys(provider)[0]);
      });
  }

  private setMobileTypeFilter(mobileGeneration: MobileGeneration): void {
    if (mobileGeneration === null) {
      this.params = this.params.delete('mobile_type');
    } else {
      this.params = this.params.set('mobile_type', mobileGeneration.type.toString());
    }
  }

  private setInternetTypeFilter(internetChannel: TrunkChannel): void {
    if (internetChannel === null) {
      this.params = this.params.delete('internet_type');
    } else {
      this.params = this.params.set('internet_type', internetChannel.type.toString());
    }
  }

  private setLocationFilter(location: string): void {
    if (location) {
      this.params = this.params.set('locationName', location);
    } else if (this.params.has('locationName')) {
      this.params = this.params.delete('locationName');
    }
  }
}
