import { Location } from './../../core/models/location';

import {
  LocationCategories,
  LocationsList,
} from '../interfaces/locations-book.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { LocationService } from '@core/services/location.service';
import {
  LOCATION_LIST,
  LOCATION_TYPE,
  LOCATION_EDIT,
} from '@core/constants/api';

export type LocationEdit = {
  type: any;
  population: number;
  parent: number;
};

export type LocationParams = {
  page?: number;
  size?: number;
  filters?: any;
};

export type LocationsListStorage = {
  locationParents: Location[];
  locationCategories: LocationCategories[];
};

@Injectable({
  providedIn: 'root',
})
export class LocationsBookService {
  private _locationsListStorage =
    new BehaviorSubject<null | LocationsListStorage>(null);
  readonly locationsListStorage$ = this._locationsListStorage.asObservable();

  constructor(
    private locationService: LocationService,
    private httpClient: HttpClient
  ) {}

  private fetchLocationsList(params?: any): Observable<LocationsList> {
    return this.httpClient.get<LocationsList>(LOCATION_LIST, { params });
  }

  private fetchLocationsType(): Observable<LocationCategories[]> {
    return this.httpClient.get<LocationCategories[]>(LOCATION_TYPE);
  }

  editLocation(id: number, body: LocationEdit): Observable<any[]> {
    let params = new HttpParams();

    if (body) {
      let keys = Object.keys(body);
      keys.forEach((key) => {
        if (body[key]) {
          params = params.append(key, body[key]);
        }
      });
    }
    // отсылаем как GET несмотря на POST
    return this.httpClient.post<[]>(
      LOCATION_EDIT.replace(':id', id.toString()),
      {}, {
        params
      }
    );
  }

  getLocationsList({
    page,
    size,
    filters,
  }: LocationParams = {}): Observable<LocationsList> {
    let params = new HttpParams();
    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }

    if (filters) {
      let keys = Object.keys(filters);
      keys.forEach((key) => {
        if (filters[key]) {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.fetchLocationsList(params);
  }

  getLocations(): Observable<any> {
    if (!this._locationsListStorage.getValue()) {
      forkJoin({
        locationParents: this.locationService.listParentLocations(),
        locationCategories: this.fetchLocationsType(),
      }).subscribe(({ locationParents, locationCategories }) => {
        this._locationsListStorage.next({
          locationParents,
          locationCategories,
        });
      });
    }

    return this.locationsListStorage$;
  }
}
