import { ApiMapper } from './api-mapper';
import { User } from '../models/user';

export class UserMapper extends ApiMapper<User, User, User> {
  mapFromApi(apiModel): User {
    return new User();
  }

  mapDetailApi(apiData): User {
    return this.mapFromApi(apiData);
  }

  mapShortApi(apiData): User {
    return this.mapFromApi(apiData);
  }
}
