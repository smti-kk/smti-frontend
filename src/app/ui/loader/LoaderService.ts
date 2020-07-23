import {EventEmitter} from '@angular/core';

export abstract class LoaderService {
  abstract startLoader(): void;
  abstract stopLoader(): void;
  abstract isLoading(): boolean;
  abstract getLoadingEventEmitter(): EventEmitter<boolean>;
}

