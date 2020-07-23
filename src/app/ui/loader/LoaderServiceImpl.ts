import {LoaderService} from './LoaderService';
import {EventEmitter} from '@angular/core';

export class LoaderServiceImpl implements LoaderService {
  loading: boolean;
  private readonly loadingObserver: EventEmitter<boolean>;

  constructor() {
    this.loading = false;
    this.loadingObserver = new EventEmitter<boolean>();
  }

  startLoader(): void {
    this.loading = true;
    this.loadingObserver.emit(true);
  }

  stopLoader(): void {
    this.loading = false;
    this.loadingObserver.emit(false);
  }

  isLoading(): boolean {
    return this.loading;
  }

  getLoadingEventEmitter(): EventEmitter<boolean> {
    return this.loadingObserver;
  }
}
