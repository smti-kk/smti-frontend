import {Observable} from 'rxjs';
import {SelectAreaItem} from '../dto/SelectAreaItem';

export abstract class SelectAreasService {
  abstract areas(): Observable<SelectAreaItem[]>;
}

