import {GovProgramService} from './GovProgramService';
import {GovProgram} from '@api/dto/GovProgram';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';

export class GPSCacheable implements GovProgramService {
  private request: Observable<GovProgram[]>;

  constructor(private readonly origin: GovProgramService) {
  }

  list(): Observable<GovProgram[]> {
    if (this.request) {
      return this.request;
    } else {
      this.request = this.origin.list().pipe(
        shareReplay()
      );
      return this.request;
    }
  }

  create(govProgram: GovProgram): Observable<GovProgram> {
    this.request = null;
    return this.origin.create(govProgram);
  }

  delete(id: number): Observable<void> {
    this.request = null;
    return this.origin.delete(id);
  }
}
