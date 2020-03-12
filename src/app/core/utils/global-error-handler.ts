/* eslint-disable no-empty */
import {ErrorHandler, Injectable} from '@angular/core';

import {NotificationService} from '@core/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notification: NotificationService) {}

  handleError(error): void {
    console.error(error);
    if (error.status === 504) {
      this.notification.error('Нарушено соединение с сервером. Код ошибки 504', 'Ошибка!');
    } else if (error.status === 400) {
    } else if (error.status) {
      this.notification.error(
        `Неизвестная ошибка, код ошибки: ${error.status}`,
        'Неизвестная ошибка'
      );
    } else {
      this.notification.error(`Неизвестная ошибка <br> ${error}`, 'Неизвестная ошибка');
    }
  }
}
