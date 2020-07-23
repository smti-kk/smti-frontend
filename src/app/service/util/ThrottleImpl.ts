import {Observable} from 'rxjs';
import {Throttle} from '@service/util/Throttle';

export class ThrottleImpl implements Throttle {
  private readonly throttleTime: number;
  private timeout;

  constructor(throttleTime: number) {
    this.throttleTime = throttleTime;
  }

  throttle<T>(request: Observable<T>): Observable<T> {
    return new Observable<T>(subscriber => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        request.subscribe(response => {
          subscriber.next(response);
        });
      }, this.throttleTime);
    });
  }
}
