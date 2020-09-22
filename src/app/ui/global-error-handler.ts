import {ErrorHandler} from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error.url && error.url.includes('/auth/account_info/') && error.status === 401) {
      return;
    }
    console.error(error);
  }
}
