import {Observable} from 'rxjs';
import {MobileType} from '../dto/MobileType';

export abstract class MobileTypeApi {
  abstract list(): Observable<MobileType[]>;
}
