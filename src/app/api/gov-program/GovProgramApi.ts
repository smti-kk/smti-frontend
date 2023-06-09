import {Observable} from 'rxjs';
import {GovProgram} from '../dto/GovProgram';

export abstract class GovProgramApi {
  abstract list(): Observable<GovProgram[]>;
  abstract create(govProgram: GovProgram): Observable<GovProgram>;
  abstract delete(id: number): Observable<void>;
}
