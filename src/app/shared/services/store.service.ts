import { Injectable } from '@angular/core';
import { isString } from 'util';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class StoreService {

    private clearMethod = {
        all: () => {
            localStorage.clear();
        },
        account: () => {
            localStorage.removeItem('account');
        },
    };

    constructor() {
    }

    set(key, value: any) {
        localStorage.setItem(key, isString(value) ? value : JSON.stringify(value));
    }

    get(key) {
        return localStorage.getItem(key);
    }

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