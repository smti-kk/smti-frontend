import {PostTypeApi} from './PostTypeApi';
import {PostType} from '../dto/PostType';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

export class PTACacheable implements PostTypeApi {
  private readonly origin: PostTypeApi;
  private history: PostType[];

  constructor(origin: PostTypeApi) {
    this.origin = origin;
  }

  list(): Observable<PostType[]> {
    if (this.history) {
      return of(this.history);
    }
    return this.origin.list().pipe(
      tap(response => {
        this.history = response;
      })
    );
  }
}
