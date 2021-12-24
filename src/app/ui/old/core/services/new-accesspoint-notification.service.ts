import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ACCESS_POINT_NOTIFICATIONS} from './../constants/api';

export interface APNotification {
  organizationName: string;
  organizationAddress: string;
}

@Injectable({
  providedIn: 'root',
})

export class NewAccessPointNotificationService {
  constructor(private httpClient: HttpClient) {}

  getAccessPointNotifications(): Observable<APNotification[] | []> {
    return this.httpClient.get<APNotification[]>(ACCESS_POINT_NOTIFICATIONS);
  }
}
