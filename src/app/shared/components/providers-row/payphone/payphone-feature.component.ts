import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseFeatureComponent} from '@shared/components/providers-row/base-feature.component';
import {AtsFeature, Operator} from '@core/models';

@Component({
  selector: 'app-payphone-features',
  templateUrl: './payphone-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayphoneFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: AtsFeature[];

  @Input() existed: Operator[];
}
