import { EventEmitter, Output } from '@angular/core';

export class BaseFormComponent<T> {
  @Output() formValue: EventEmitter<T> = new EventEmitter<T>();

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
}
