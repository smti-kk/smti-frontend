import {Observable} from 'rxjs';
import {GovProgram} from '../dto/GovProgram';

export abstract class GovProgramApi {
  abstract list(): Observable<GovProgram[]>;
}
