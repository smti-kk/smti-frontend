import {autoserializeAs} from 'cerialize';

import {Operator} from '@core/models/operator';
import {popToTop} from '@core/utils/sort';
import {LocationFeatures} from '@core/models/location-features';
import {LocationFeature} from '@core/models/location-feature';

export class ExistingOperators {
  @autoserializeAs(Operator, 'cellurar')
  private _cellular: Operator[];

  @autoserializeAs(Operator, 'radio')
  private _radio: Operator[];

  @autoserializeAs(Operator, 'internet')
  private _internet: Operator[];

  @autoserializeAs(Operator, 'ats')
  private _ats: Operator[];

  @autoserializeAs(Operator, 'post')
  private _post: Operator[];

  @autoserializeAs(Operator, 'television')
  private _television: Operator[];

  constructor(
    cellular: Operator[],
    radio: Operator[],
    internet: Operator[],
    ats: Operator[],
    post: Operator[],
    television: Operator[]
  ) {
    this._cellular = cellular;
    this._radio = radio;
    this._internet = internet;
    this._ats = ats;
    this._post = post;
    this._television = television;
  }

  get cellular(): Operator[] {
    return this._cellular;
  }

  set cellular(value: Operator[]) {
    this._cellular = value;
  }

  get radio(): Operator[] {
    return this._radio;
  }

  set radio(value: Operator[]) {
    this._radio = value;
  }

  get internet(): Operator[] {
    return this._internet;
  }

  set internet(value: Operator[]) {
    this._internet = value;
  }

  get ats(): Operator[] {
    return this._ats;
  }

  set ats(value: Operator[]) {
    this._ats = value;
  }

  get post(): Operator[] {
    return this._post;
  }

  set post(value: Operator[]) {
    this._post = value;
  }

  get television(): Operator[] {
    return this._television;
  }

  set television(value: Operator[]) {
    this._television = value;
  }

  sortByLocationFeatures(features: LocationFeatures): ExistingOperators {
    features.cellular = ExistingOperators.filterDistinct(features.cellular);
    features.television = ExistingOperators.filterDistinct(features.television);
    features.post = ExistingOperators.filterDistinct(features.post);
    features.ats = ExistingOperators.filterDistinct(features.ats);
    features.internet = ExistingOperators.filterDistinct(features.internet);
    features.radio = ExistingOperators.filterDistinct(features.radio);

    this.cellular = ExistingOperators.sortByLocationFeature(features.cellular, this.cellular);
    this.television = ExistingOperators.sortByLocationFeature(features.television, this.television);
    this.post = ExistingOperators.sortByLocationFeature(features.post, this.post);
    this.ats = ExistingOperators.sortByLocationFeature(features.ats, this.ats);
    this.internet = ExistingOperators.sortByLocationFeature(features.internet, this.internet);
    this.radio = ExistingOperators.sortByLocationFeature(features.radio, this.radio);
    return this;
  }

  private static filterDistinct<T extends LocationFeature>(features: T[]): T[] {
    return features.filter((item, index) => {
      const findByOperator = features.find(i => i.operator.id === item.operator.id);
      return features.indexOf(findByOperator) === index;
    });
  }

  private static sortByLocationFeature(
    locationFeature: LocationFeature[],
    operators: Operator[]
  ): Operator[] {
    locationFeature.reverse().forEach(c => {
      operators = popToTop(operators, c.operator);
    });

    locationFeature.reverse();

    return operators;
  }
}
