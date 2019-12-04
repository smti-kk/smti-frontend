import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@core/services/store.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GovProgram } from '@core/services/index';
import { OrderingFilter } from '@shared/layout/filter-btn/filter-btn.component';
import { LocationCapabilities, MailType, MobileGenerationType, SignalType, TrunkChannelType } from '@core/models';
import { environment } from '../../../environments/environment';
import { RestApiService } from '@core/services/common/rest-api-service';
import { LocationCapabilitiesMapper } from '@core/utils/location-capabilities.mapper';

const LTC = '/api/v1/ltc';

export enum OrderingDirection {
  ASC,
  DSC,
  UNDEFINED
}

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient,
              private storeService: StoreService,
              private capabilitiesMapper: LocationCapabilitiesMapper) {
    super(httpClient, storeService, LTC, capabilitiesMapper);
  }
}

interface TcFilters {
  order: OrderingFilter;
  program: GovProgram;
  hasEspd: boolean;
  hasPayphone: boolean;
  hasInfomat: boolean;
  hasRadio: boolean;
  hasTelephone: boolean;
  mailType: MailType;
  tvType: SignalType;
  internet: { [providerId: string]: boolean }[];
  mobile: { [providerId: string]: boolean }[];
  mobileType: MobileGenerationType;
  internetType: TrunkChannelType;
  locationName: string;
}

@Injectable()
export class FilterTcPivotsService extends TcPivotsService {
  protected params: HttpParams = new HttpParams();
  protected filters: TcFilters;

  private TRUE = '2';

  list(): Observable<LocationCapabilities[]> {
    return super.list(this.params);
  }

  filter(filters: TcFilters) {
    this.filters = filters;

    this.setFilterByProgram(filters.program);
    this.setFilterOrdering(filters.order);
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

  exportExcel() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/ltc/export/?' + this.params.toString());
  }

  protected setFilterOrdering(order?: OrderingFilter) {
    if (order && order.orderingDirection === OrderingDirection.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === OrderingDirection.DSC) {
      this.params = this.params.set('ordering', '-' + order.name);
    } else {
      this.params = this.params.delete('ordering');
    }
  }

  private setFilterByProgram(value: GovProgram) {
    if (value) {
      this.params = this.params.set('govenmet_programs', value.id.toString());
    } else {
      this.params = this.params.delete('govenmet_programs');
    }
  }

  private setFilterBoolean(field: string, value: boolean) {
    if (value === true) {
      this.params = this.params.set(field, this.TRUE);
    } else if (this.params.has(field)) {
      this.params = this.params.delete(field);
    }
  }

  private setFilterByMailType(type: MailType) {
    if (type) {
      this.params = this.params.set('post_type', type.toString());
    } else {
      this.params = this.params.delete('post_type');
    }
  }

  private setFilterByTvType(type: SignalType) {
    if (type) {
      this.params = this.params.set('tv_type', type.toString());
    } else {
      this.params = this.params.delete('tv_type');
    }
  }

  private setMobileOperatorFilter(providers: { [providerId: string]: boolean }[]) {
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

  private setInternetOperatorFilter(providers: { [providerId: string]: boolean }[]) {
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

  private setMobileTypeFilter(mobileType: MobileGenerationType) {
    if (mobileType === null) {
      this.params = this.params.delete('mobile_type');
    } else {
      this.params = this.params.set('mobile_type', mobileType.toString());
    }
  }

  private setInternetTypeFilter(internetType: TrunkChannelType) {
    if (internetType === null) {
      this.params = this.params.delete('internet_type');
    } else {
      this.params = this.params.set('internet_type', internetType.toString());
    }
  }

  private setLocationFilter(location: string) {
    if (location) {
      this.params = this.params.set('locationName', location);
    } else if (this.params.has('locationName')) {
      this.params = this.params.delete('locationName');
    }
  }
}

