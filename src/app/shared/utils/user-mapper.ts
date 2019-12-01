import { ApiMapper } from './api-mapper';
import { User } from '@core/models';

export class UserMapper extends ApiMapper<User, User, User> {
  // noinspection JSMethodCanBeStatic
  mapFromApi(apiModel): User {
    return new User(apiModel.email);
  }

  mapDetailApi(apiData): User {
    return this.mapFromApi(apiData);
  }

  mapShortApi(apiData): User {
    return this.mapFromApi(apiData);
  }
}
