import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: SharedModule
})
export default class MapService {
  constructor(private http: HttpClient) {
  }

  getOperators() {
    return this.http.get('api/v1/operator');
  }

  getMobileType() {
    return this.http.get('api/v1/mobile-type');
  }
}
