import {Component, Input} from '@angular/core';

@Component({
  selector: 'accordion-header',
  template: `
    <div class="d-flex" style="width: 100%; align-items: baseline;">
      <div style="flex-grow: 1; display: flex"><ng-content></ng-content></div>
      <div class="c-accordion-button" [class.is-open]="_isOpen"></div>
    </div>
  `,
})
export class AccordionHeaderComponent {
  @Input() _isOpen = false;

  isOpen(value: boolean): void {
    this._isOpen = value;
  }
}
