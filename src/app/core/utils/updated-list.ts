import {Observable} from 'rxjs';

const MINUTES = 5;
const SECONDS = 60;
const MILLISECONDS = 1000;

export const TIMER_INTERVAL = MINUTES * SECONDS * MILLISECONDS;

export class UpdatedList<T extends {id: number}> {
  private _items: T[] = [];
  private _timerId: number;
  private isClosedUpdate = false;

  constructor(private getData: () => Observable<T[]>, private onUpdate: (data: T[]) => void) {
    // this.update();
  }

  get items() {
    return this._items;
  }

  startUpdate() {
    this._timerId = window.setInterval(() => {
      this.timerUpdate();
    }, TIMER_INTERVAL);
  }

  stopUpdate() {
    window.clearInterval(this._timerId);
    this._timerId = null;
  }

  forceUpdate() {
    if (this.isClosedUpdate) {
      return;
    }
    this.update();
  }

  closeUpdate() {
    this.isClosedUpdate = true;
  }

  openUpdate() {
    this.isClosedUpdate = false;
  }

  private update() {
    let stopped = false;

    if (this._timerId) {
      this.stopUpdate();
      stopped = true;
    }

    this.getData().subscribe(data => {
      this._items = data;
      this.onUpdate(data);

      if (stopped) {
        this.startUpdate();
      }
    });
  }

  private timerUpdate() {
    this.update();
  }
}
