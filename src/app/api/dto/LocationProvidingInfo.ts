export interface FeatureProvidingInfo {
  locationsCount: number;
  population: number;
  locationsPercents: number;
  populationPercents: number;
}

export interface LocationProvidingInfo {
  name: string;
  type: string;
  population: number;
  locationsCount: number;
  cellular: FeatureProvidingInfo;
  internet: FeatureProvidingInfo;
  tv: FeatureProvidingInfo;
  payphone: FeatureProvidingInfo;
  ats: FeatureProvidingInfo;
  radio: FeatureProvidingInfo;
  post: FeatureProvidingInfo;
  infomat: FeatureProvidingInfo;
}
