import { RestApiService } from '@shared/services/common/rest-api-service';
import { LocationCapabilities, TrunkChannelType } from '@shared/models/location-capabilities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreService } from '@shared/services/store.service';
import { LocationCapabilitiesMapper } from '@shared/utils/location-capabilities.mapper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GovProgram } from '@shared/services/gov-program.service';
import { OrderingFilter } from '../components/filter-btn/filter-btn.component';
import { MailType, MobileGeneration, SignalType } from '@shared/models/enums';
import { environment } from '../../../../environments/environment';

const LTC = '/api/v1/ltc';

export enum FilterType {
  ASC,
  DSC,
  UNDEFINED
}

@Injectable()
export class TcPivotsService extends RestApiService<LocationCapabilities, LocationCapabilities, LocationCapabilities> {
  constructor(private httpClient: HttpClient, private storeService: StoreService, private capabilitiesMapper: LocationCapabilitiesMapper) {
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
  mobileType: MobileGeneration;
  internetType: TrunkChannelType;
}

@Injectable()
export class FilterTcPivotsService extends TcPivotsService {
  private params: HttpParams = new HttpParams();

  private TRUE = '2';

  list(): Observable<LocationCapabilities[]> {
    const params = this.params
      .set('parent', '2093');
    return super.list(params);
  }

  filter(filters: TcFilters) {
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
  }

  exportExcel() {
    window.location.href = (environment.API_BASE_URL + '/api/v1/ltc/export/?' + this.params.toString());
  }

  private setFilterOrdering(order?: OrderingFilter) {
    if (order && order.orderingDirection === FilterType.ASC) {
      this.params = this.params.set('ordering', order.name);
    } else if (order && order.orderingDirection === FilterType.DSC) {
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

  private setMobileTypeFilter(mobileType: MobileGeneration) {
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
}

