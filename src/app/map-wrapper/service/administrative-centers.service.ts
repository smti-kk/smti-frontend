import { RestApiService } from '../../shared/services/common/rest-api-service';
import { AdministrativeCenterPoint } from '@map-wrapper/model/administrative-center-point';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../shared/services/store.service';
import { LOCATION_URL } from '@map-wrapper/constants/api.constants';
import { AdministrativeCentersMapper } from '@map-wrapper/utils/administrative-centers-mapper';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AdministrativeCentersService
  extends RestApiService<AdministrativeCenterPoint, AdministrativeCenterPoint, AdministrativeCenterPoint> {
  constructor(httpClient: HttpClient,
              store: StoreService) {
    super(httpClient, store, LOCATION_URL, new AdministrativeCentersMapper());
  }

  // todo: Будет удалено
  // tslint:disable-next-line:member-ordering
  private administrativePoints: AdministrativeCenterPoint[];

  list() {
    if (!this.administrativePoints) {
      return super.list()
        .pipe(tap(points => this.administrativePoints = points));
    } else {
      return of(this.administrativePoints);
    }
  }
}
