import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { forkJoin, Observable } from 'rxjs';
import { LocationCapabilities } from '../models/location-capabilities';
import { HttpClient } from '@angular/common/http';
import { PSEUDO, TECHNICAL_CAPABILITIES } from '../constants/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: SharedModule
})
export class LocationCapabilitiesService {
  constructor(private http: HttpClient) {
  }

  get(id: number): Observable<LocationCapabilities> {
    return forkJoin([
      this.http.get(TECHNICAL_CAPABILITIES.replace(':id', `${id}`)),
      this.http.get(PSEUDO.replace(':id', `${id}`))
    ])
      .pipe(map(data => LocationCapabilities.createFromApiModel(data[0], data[1])));
  }
}
