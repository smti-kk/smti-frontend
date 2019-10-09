import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapWrapperModule } from '../map-wrapper.module';

@Injectable({
  providedIn: MapWrapperModule
})
export default class ServerEnumService {
  constructor(private http: HttpClient) {
  }

  getOperators() {
    return this.http.get('api/v1/operator');
  }

  getMobileType() {
    return this.http.get('api/v1/mobile-type');
  }
}
