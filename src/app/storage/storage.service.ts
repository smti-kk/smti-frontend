export abstract class StorageService {
  abstract save<T>(id: string, value: T): void;
  abstract get<T>(id: string): T;
  abstract saveToken(token: string): void;
  abstract getToken(): string;
}
