import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseFeatureComponent} from '@shared/components/providers-row/base-feature.component';
import {Operator, RadioFeature} from '@core/models';

@Component({
  selector: 'app-radio-features',
  templateUrl: './radio-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: RadioFeature[];

  @Input() existed: Operator[];
}
