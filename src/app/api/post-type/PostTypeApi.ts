import {Observable} from 'rxjs';
import {PostType} from '../dto/PostType';

export abstract class PostTypeApi {
  abstract list(): Observable<PostType[]>;
}

