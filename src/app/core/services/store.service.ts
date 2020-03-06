import {Injectable} from '@angular/core';

@Injectable()
export class StoreService {
  private static clearMethod = {
    all: (): void => {
      localStorage.clear();
    },
    token: (): void => {
      localStorage.removeItem('token');
    },
  };

  static clear(type = 'all'): void {
    StoreService.clearMethod[type]();
  }

  static set(key, value: {} | string): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static get(key): string {
    return localStorage.getItem(key);
  }
}
