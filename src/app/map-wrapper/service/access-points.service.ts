import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccessPointEspd } from '../model/access-point-espd';
import { AccessPointSmo } from '../model/access-point-smo';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds } from 'leaflet';
import { AdministrativeCenterPoint } from '../model/administrative-center-point';
import { ACCESS_POINT_ESPD_URL, ACCESS_POINT_SMO_URL, LOCATION_URL } from '../constants/api.constants';
import { MapWrapperModule } from '@map-wrapper/map-wrapper.module';

@Injectable({
  providedIn: MapWrapperModule
})
export class AccessPointsService {
  constructor(private http: HttpClient) {
  }

  public getAccessPointsSmo(bounds?: LatLngBounds): Observable<AccessPointSmo[]> {
    if (bounds) {
      return this.http.get<any[]>(`${ACCESS_POINT_SMO_URL}?bbox=
                                                    ${bounds.getSouthWest().lng},
                                                    ${bounds.getSouthWest().lat},
                                                    ${bounds.getNorthEast().lng},
                                                    ${bounds.getNorthEast().lat}`)
        .pipe(map(apss => apss.map(aps => AccessPointSmo.createFromApiModel(aps))));
    } else {
      return this.http.get<any[]>(ACCESS_POINT_SMO_URL)
        .pipe(map(apss => apss.map(aps => AccessPointSmo.createFromApiModel(aps))));
    }
  }

  public getAccessPointsEspd(bounds?: LatLngBounds): Observable<AccessPointEspd[]> {
    if (bounds) {
      return this.http.get<any[]>(`${ACCESS_POINT_ESPD_URL}?bbox=
                                                    ${bounds.getSouthWest().lng},
                                                    ${bounds.getSouthWest().lat},
                                                    ${bounds.getNorthEast().lng},
                                                    ${bounds.getNorthEast().lat}`)
        .pipe(map(apss => apss.map(aps => AccessPointEspd.createFromApiModel(aps))));
    } else {
      return this.http.get<any[]>(ACCESS_POINT_ESPD_URL)
        .pipe(map(apss => apss.map(aps => AccessPointEspd.createFromApiModel(aps))));
    }
  }

  // todo: Будет удалено
  // tslint:disable-next-line:member-ordering
  private administrativePoints: AdministrativeCenterPoint[];

  public getAdministrativePoints(): Observable<AdministrativeCenterPoint[]> {
    if (!this.administrativePoints) {
      return this.http.get<any[]>(LOCATION_URL)
        .pipe(map(locations => {
          this.administrativePoints = locations.map(location => AdministrativeCenterPoint.create(location));
          return this.administrativePoints;
        }));
    } else {
      return of(this.administrativePoints);
    }
  }
}
