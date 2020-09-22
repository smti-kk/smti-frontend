import {Observable} from 'rxjs';

export interface Throttle {
  throttle<T>(request: Observable<T>): Observable<T>;
}
