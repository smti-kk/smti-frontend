import {OperatorsApi} from './OperatorsApi';
import {Operators} from '../dto/Operators';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Operator} from '@api/dto/Operator';

export class OACacheable implements OperatorsApi {
  private readonly origin: OperatorsApi;
  private cachedOperators: Observable<Operators>;
  private cachedOperatorsFull: Operator[];

  constructor(origin: OperatorsApi) {
    this.origin = origin;
  }

  get(): Observable<Operators> {
    if (!this.cachedOperators) {
      this.cachedOperators = this.origin.get().pipe(
        shareReplay()
      );
    }
    return this.cachedOperators;
  }

  findAll(): Observable<Operator[]> {
    if (this.cachedOperatorsFull) {
      return of(this.cachedOperatorsFull);
    } else {
      return this.origin.findAll().pipe(
        tap(response => this.cachedOperatorsFull = response)
      );
    }
  }
}
