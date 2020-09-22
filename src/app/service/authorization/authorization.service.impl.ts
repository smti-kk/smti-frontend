import {AuthorizationService} from './authorization.service';
import {AuthorizationApi} from '@api/authorization/authorization.api';
import {StorageService} from '../../storage/storage.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export class AuthorizationServiceImpl implements AuthorizationService {
  constructor(private authorizationApi: AuthorizationApi,
              private storageService: StorageService) {
  }

  /**
   * авторизация пользователя и сохранение токена авторизации в Storage
   * @param email логин пользователя
   * @param password пароль польщователя
   */
  authorize(email: string, password: string): Observable<void> {
    return this.authorizationApi.authorize(email, password).pipe(
      tap(response => {
        this.storageService.saveToken(response.token);
      }),
      map(() => {
      }),
    );
  }

  logout(): void {
    this.storageService.saveToken(null);
    window.location.reload();
  }
}
