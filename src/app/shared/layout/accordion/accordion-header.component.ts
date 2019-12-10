import { Component, Input } from '@angular/core';

@Component({
  selector: 'accordion-header',
  template: `
    <ng-content></ng-content>
    <div class="c-accordion-button" [class.is-open]="isOpen"></div>
  `
})
export class AccordionHeaderComponent {
  @Input() isOpen = false;
}
