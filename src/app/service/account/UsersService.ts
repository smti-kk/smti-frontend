import {Observable} from 'rxjs';
import {UserFromApi} from "../../api/dto/UserFromApi";
import {UsersPageItem} from "@api/dto/UserPageItem";

export abstract class UsersService {
  abstract list(): Observable<UserFromApi[]>;
  // abstract list(): Observable<UsersPageItem[]>;

  abstract update(item: UserFromApi): Observable<UserFromApi>;
}

