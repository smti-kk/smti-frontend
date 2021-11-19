import {Component, OnInit} from '@angular/core';
import {AccessPointNotificationService} from '@service/access-points/access-point-notification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  constructor(
    private apNotification: AccessPointNotificationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.apNotification.getNotifications();
    this.apNotification.newApNotification.subscribe((notifications) => {
      notifications.forEach((msg: any) => {
        this.toastr.info(msg, 'Система оповещения', {
          closeButton: true,
          enableHtml: true,
          toastClass: 'ngx-toastr ap-notification',
          titleClass: 'ap-notification-title',
          messageClass: 'ap-notification-message',
          timeOut: 30_000,
          extendedTimeOut: 10_000,
        });
      });
    });
  }
}
