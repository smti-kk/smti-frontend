import {GovProgramService} from './GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

export class GPSCacheable implements GovProgramService {
  private cache: GovProgram[];

  constructor(private readonly origin: GovProgramService) {
  }

  list(): Observable<GovProgram[]> {
    if (this.cache) {
      return of(this.cache);
    } else {
      return this.origin.list().pipe(
        tap(gps => this.cache = gps)
      );
    }
  }
}
