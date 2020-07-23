import {Observable} from 'rxjs';
import {DLocationBase} from "../../api/dto/DLocationBase";

export abstract class DLocationsService {
  abstract all(): Observable<DLocationBase[]>;
}

