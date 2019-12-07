import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CellularFeature, Operator } from '@core/models';
import { BaseFeatureComponent } from '@shared/components/providers-row/base-feature.component';

@Component({
  selector: 'app-cellular-features',
  templateUrl: 'cellular-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellularFeatureComponent extends BaseFeatureComponent {
  @Input() locationFeatures: CellularFeature[];
  @Input() existed: Operator[];
}
