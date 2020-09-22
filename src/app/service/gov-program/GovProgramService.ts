import {Observable} from 'rxjs';
import {GovProgram} from '@api/dto/GovProgram';

export abstract class GovProgramService {
  abstract list(): Observable<GovProgram[]>;
}

