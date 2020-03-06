import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // eslint-disable-next-line class-methods-use-this
  handleError(error): void {
    console.error(error);
  }
}
