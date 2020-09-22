import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {BaseFeatureComponent} from '@shared/components/providers-row/base-feature.component';
import {Operator} from '@core/models';
import {TelevisionFeature} from '@core/models/radio-location-feature';

@Component({
  selector: 'app-television-features',
  templateUrl: './television-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelevisionFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: TelevisionFeature[];

  @Input() existed: Operator[];
}
