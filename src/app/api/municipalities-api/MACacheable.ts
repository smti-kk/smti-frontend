import {MunicipalitiesApi} from './MunicipalitiesApi';
import {LocationArea} from './LocationArea';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export class MACacheable implements MunicipalitiesApi {
  private cached: Observable<LocationArea[]>;

  constructor(private readonly origin: MunicipalitiesApi) {
  }

  list(): Observable<LocationArea[]> {
    if (!this.cached) {
      this.cached = this.origin.list().pipe(
        shareReplay()
      );
    }
    return this.cached;
  }
}
