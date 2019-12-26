import {Injectable} from '@angular/core';
import {isString} from 'util';

@Injectable()
export class StoreService {
  private clearMethod = {
    all: () => {
      localStorage.clear();
    },
    token: () => {
      localStorage.removeItem('token');
    },
  };

  constructor() {}

  // noinspection JSMethodCanBeStatic
  set(key, value: any) {
    localStorage.setItem(key, isString(value) ? value : JSON.stringify(value));
  }

  // noinspection JSMethodCanBeStatic
  get(key) {
    return localStorage.getItem(key);
  }

  // noinspection JSMethodCanBeStatic
  getObject(key) {
    const stringValue = localStorage.getItem(key);
    let res;

    if (!stringValue) {
      return;
    }
    try {
      res = JSON.parse(stringValue);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(`cant parse value: ${stringValue}`);
    }
    return res;
  }

  clear(type = 'all') {
    this.clearMethod[type]();
  }
}
