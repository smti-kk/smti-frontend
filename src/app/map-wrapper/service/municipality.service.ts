import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationArea } from '../model/location-area';
import { HttpClient } from '@angular/common/http';
import { LOCATION_AREA_URL } from '../constants/api.constants';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';

@Injectable({
  providedIn: MapWrapperModule
})
export class MunicipalityService {
  private _municipalitiesAreas: Subject<LocationArea[]> = new Subject<LocationArea[]>();

  constructor(private http: HttpClient) {
    this.getMunicipalitiesArea().subscribe(municipalitiesArea => this.municipalitiesAreas.next(municipalitiesArea));
  }


  get municipalitiesAreas(): Subject<LocationArea[]> {
    return this._municipalitiesAreas;
  }

  getMunicipalitiesArea(): Observable<LocationArea[]> {
    return this.http
      .get<[]>(LOCATION_AREA_URL)
      .pipe(map(locationAreas => locationAreas.map(la => LocationArea.createFromApiModel(la))));
  }
}


