import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class NotificationService {
  private static notification: NzNotificationService;

  constructor(private readonly notification: NzNotificationService) {
    NotificationService.notification = notification;
  }

  public warning(message: string, title: string): void {
    NotificationService.notification.create('warning', title, message);
  }

  public success(message: string, title: string): void {
    NotificationService.notification.create('success', title, message);
  }

  public error(message: string, title: string): void {
    NotificationService.notification.create('error', title, message, {nzDuration: 0});
  }

  public info(message: string, title: string): void {
    NotificationService.notification.create('info', title, message);
  }
}
