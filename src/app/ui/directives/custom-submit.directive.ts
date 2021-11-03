import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[customSubmit]',
})

// Submit only on pressing 'Enter' or when triggering onChange event
export class CustomSubmitDirective {
  @Output() controlUpdate = new EventEmitter<string>();

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.controlUpdate.emit((e.target as HTMLInputElement).value);
      return;
    }
  }
  @HostListener('change', ['$event'])
  onChange(e: Event) {
    this.controlUpdate.emit((e.target as HTMLInputElement).value);
  }
}
