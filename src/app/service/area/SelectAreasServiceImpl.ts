import {Observable} from 'rxjs';
import {SelectAreaItem} from '@service/dto/SelectAreaItem';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {LocationAreaApi} from '@api/area/LocationAreaApi';
import {map} from 'rxjs/operators';

export class SelectAreasServiceImpl implements SelectAreasService {
  private readonly locationAreaApi: LocationAreaApi;

  constructor(locationAreaApi: LocationAreaApi) {
    this.locationAreaApi = locationAreaApi;
  }

  areas(): Observable<SelectAreaItem[]> {
    return this.locationAreaApi.areas().pipe(
      map(areas => {
        return areas.map(area => {
          return {
            id: area.id,
            label: area.type + ' ' + area.name
          };
        });
      })
    );
  }
}
