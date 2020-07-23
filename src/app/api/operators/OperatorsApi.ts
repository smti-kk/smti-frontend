import {Operators} from '../dto/Operators';
import {Observable} from 'rxjs';

export abstract class OperatorsApi {
  abstract get(): Observable<Operators>;
}

