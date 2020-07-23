import {StorageService} from './storage.service';

export class LocalStorageService implements StorageService {
  save<T>(id: string, value: T): void {
    localStorage.setItem(id, JSON.stringify(value));
  }

  get<T>(id: string): T {
    const item = localStorage.getItem(id) as any;
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  saveToken(token: string): void {
    this.save('token', token);
  }

  getToken(): string {
    return this.get('token');
  }
}
