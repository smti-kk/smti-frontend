import {Observable} from 'rxjs';
import {DLocationBase} from '../dto/DLocationBase';

export interface DLocationBaseApi {
  getAll(): Observable<DLocationBase[]>;
}

