import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {BaseFeatureComponent} from '@shared/components/providers-row/base-feature.component';
import {LocationFeature, Operator} from '@core/models';

@Component({
  selector: 'app-ats-features',
  templateUrl: './ats-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtsFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: LocationFeature[];

  @Input() existed: Operator[];
}
