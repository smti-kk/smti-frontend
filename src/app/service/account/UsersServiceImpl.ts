import {Observable} from "rxjs";
import {UserFromApi} from "@api/dto/UserFromApi";
import {UsersService} from "./UsersService";
import {UsersApi} from "@api/account/UsersApi";
import {UsersPageItem} from "@api/dto/UserPageItem";
import {map} from "rxjs/operators";

export class UsersServiceImpl implements UsersService {
  private readonly usersApi: UsersApi;

  constructor(usersApi: UsersApi) {
    this.usersApi = usersApi;
  }

  list(): Observable<UserFromApi[]> {
    return this.usersApi.list();
  }

/*
  list(): Observable<UsersPageItem[]> {
    return this.usersApi.list().pipe(
      map(response => {
        return response.map(user => {
          return {
            firstname: user.firstName,
            lastname: user.lastName,
            activeStatus: user.isActive ? 'да' : 'нет',
            username: user.username
          };
        });
      })
    );
  }*/

  update(item: UserFromApi): Observable<UserFromApi> {
    return this.usersApi.update(item);
  }
}
