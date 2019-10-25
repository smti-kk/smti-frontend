import { Observable, Subject } from 'rxjs';

const MINUTES = 5;
const SECONDS = 60;
const MILLISECONDS = 1000;

export const TIMER_INTERVAL = MINUTES * SECONDS * MILLISECONDS;

export class UpdatedList<T> {
  private _items: T[] = [];
  private _observable: Subject<T[]> = new Subject<T[]>();
  private _timerId: number;

  constructor(private getData: () => Observable<T[]>) {
    this.update();
  }

  get items() {
    return this._items;
  }

  get onUpdate() {
    return this._observable;
  }

  startUpdate() {
    this._timerId = window.setInterval(() => {
      this.update();
    }, TIMER_INTERVAL);
  }

  stopUpdate() {
    window.clearInterval(this._timerId);
    this._timerId = null;
  }

  update() {
    let stopped = false;

    if (this._timerId) {
      this.stopUpdate();
      stopped = true;
    }

    this.getData().subscribe(data => {
      this._items = data;
      this._observable.next(data);

      if (stopped) {
        this.startUpdate();
      }
    });
  }
}
