import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Operator } from '@core/models';
import { InternetFeature } from '@core/models/internet-feature';
import { BaseFeatureComponent } from '@shared/components/providers-row/base-feature.component';

@Component({
  selector: 'app-internet-features',
  templateUrl: 'internet-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternetFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: InternetFeature[];
  @Input() existed: Operator[];
}
