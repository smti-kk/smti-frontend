import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export interface CookieServiceSetOptions {
  expires: Date;

  path: string;

  domain: string;

  secure: boolean;

  sameSite: 'lax' | 'none' | 'strict';
}

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  getCookieString(): string {
    return this.document.cookie;
  }

  check(name: string): boolean {
    name = encodeURIComponent(name);
    const regExp: RegExp = this.getCookieRegExp(name);

    return regExp.test(this.getCookieString());
  }

  get(name: string): string {
    if (this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this.getCookieString());

      return decodeURIComponent(result[1]);
    }

    return null;
  }

  getAll(): {[p: string]: any} {
    const cookies: {[key: string]: string} = {};

    if (this.getCookieString() && this.getCookieString() !== '') {
      const splits = this.getCookieString().split(';');

      // eslint-disable-next-line no-restricted-syntax
      for (const split of splits) {
        const currentCookie = split.split('=');

        currentCookie[0] = currentCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
      }
    }

    return cookies;
  }

  put(name: string, value: string, options: Partial<CookieServiceSetOptions>): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

    if (options.expires) {
      cookieString += `expires=${options.expires.toUTCString()};`;
    }

    if (options.path) {
      cookieString += `path=${options.path};`;
    }

    if (options.domain) {
      cookieString += `domain=${options.domain};`;
    }

    if (options.secure) {
      cookieString += 'secure;';
    }

    if (options.sameSite) {
      cookieString += `sameSite=${options.sameSite};`;
    }

    this.document.cookie = cookieString;
  }

  remove(name: string, path?: string, domain?: string): void {
    this.put(name, '', {path, domain, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT')});
  }

  removeAll(path?: string, domain?: string): void {
    const cookies = this.getAll();

    for (const cookieName of Object.keys(cookies)) {
      this.remove(cookieName, path, domain);
    }
  }

  protected getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp(`(?:^${escapedName}|;\\s*${escapedName})=(.*?)(?:;|$)`, 'g');
  }
}
