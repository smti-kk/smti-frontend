import {SearchService} from './SearchService';
import {LocationSearchGroup} from '../dto/LocationSearchOptions';
import {Observable} from 'rxjs';
import {Throttle} from '@service/util/Throttle';

/**
 * Троттлинг поисковых запросов
 */
export class SSThrottled implements SearchService {
  private readonly origin: SearchService;
  private readonly throttler: Throttle;

  constructor(origin: SearchService,
              throttler: Throttle) {
    this.origin = origin;
    this.throttler = throttler;
  }

  search(searchString: string): Observable<LocationSearchGroup[]> {
    return this.throttler.throttle(this.origin.search(searchString));
  }
}
