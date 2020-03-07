import {Component, Input} from '@angular/core';
import {Operator} from '@core/models';

@Component({
  selector: 'app-operator-icon',
  template: `
    <div class="c-vendor">
      <div class="c-vendor-logo">
        <img class="image" [src]="operator.icon" [alt]="operator.name" [title]="operator.name" />
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class OperatorIconComponent {
  @Input() operator: Operator;
}
