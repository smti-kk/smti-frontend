import {Observable} from 'rxjs';
import {IpInfo} from './dto/IpInfo';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export abstract class IpInfoApi {
  abstract get(): Observable<IpInfo>;
}

@Injectable()
export class GeobytesComIpInfoApi implements IpInfoApi {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<IpInfo> {
    return this.httpClient.get<IpInfo>('/GetCityDetails');
  }
}
