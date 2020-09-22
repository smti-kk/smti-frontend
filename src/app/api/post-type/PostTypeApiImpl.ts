import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostTypeApi} from './PostTypeApi';
import {POST_TYPES_API} from '../../../environments/api.routes';
import {PostType} from '../dto/PostType';

export class PostTypeApiImpl implements PostTypeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  list(): Observable<PostType[]> {
    return this.httpClient.get<PostType[]>(POST_TYPES_API);
  }
}
