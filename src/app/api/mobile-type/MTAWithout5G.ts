import {MobileTypeApi} from './MobileTypeApi';
import {MobileType} from '../dto/MobileType';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export class MTAWithout5G implements MobileTypeApi {

  constructor(private readonly origin: MobileTypeApi) {
  }

  list(): Observable<MobileType[]> {
    return this.origin.list().pipe(
      map(mobileTypes => {
        return mobileTypes.filter(mobileType => mobileType.name !== '5G');
      })
    );
  }
}
