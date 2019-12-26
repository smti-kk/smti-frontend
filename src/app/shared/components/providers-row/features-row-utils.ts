import {LocationFeature, Operator} from '@core/models';

export class FeaturesRowUtils {
  getByOperator<T extends LocationFeature>(locationFeatures: T[], operator: Operator): T {
    return locationFeatures.find(lf => lf.operator.id === operator.id);
  }

  hasOperator<T extends LocationFeature>(locationFeatures: T[], operator: Operator): boolean {
    return !!locationFeatures.find(lf => {
      return lf.operator.id === operator.id;
    });
  }
}
