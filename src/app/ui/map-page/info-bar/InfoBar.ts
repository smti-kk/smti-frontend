import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'info-bar',
  templateUrl: 'info-bar.html',
  styleUrls: ['info-bar.scss'],
})
export class InfoBar {
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() opened: boolean;

  public onToggle(): void {
    this.opened = !this.opened;
    this.toggle.emit(this.opened);
  }
}
