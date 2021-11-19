import {Injectable} from '@angular/core';
import {BehaviorSubject, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {
  APNotification,
  NewAccessPointNotificationService,
} from '../../ui/old/core/services/new-accesspoint-notification.service';


@Injectable({
  providedIn: 'root',
})
export class AccessPointNotificationService {
  private _apNotifications = new BehaviorSubject<string[] | []>([]);

  constructor(
    private accessPointNotification: NewAccessPointNotificationService
  ) {}

  get newApNotification(): Observable<string[] | []> {
    return this._apNotifications.asObservable();
  }

  getNotifications(): void {
    // After 3 sec, make a req to get an AP notifications list, repeat req every 5 mins
    timer(3000, 5 * 60 * 1000)
      .pipe(
        concatMap(() =>
          this.accessPointNotification.getAccessPointNotifications()
        ),
        // Convert to general msg
        map((notifications) => {
          if (notifications.length) {
            return (notifications as APNotification[]).map(
              (n: APNotification) =>
                `<div>Точка подключена к системам мониторинга:</div> <div>${n.organizationName},</div> <div>${n.organizationAddress}</div>`
            );
          } else {
            return [];
          }
        })
      )
      .subscribe((message) => {
        this._apNotifications.next(message);
      });
  }
}
