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

  get radio(): Operator[] {
    return this._radio;
  }

  get internet(): Operator[] {
    return this._internet;
  }

  get ats(): Operator[] {
    return this._ats;
  }

  get post(): Operator[] {
    return this._post;
  }

  get television(): Operator[] {
    return this._television;
  }

  set cellular(value: Operator[]) {
    this._cellular = value;
  }

  set radio(value: Operator[]) {
    this._radio = value;
  }

  set internet(value: Operator[]) {
    this._internet = value;
  }

  set ats(value: Operator[]) {
    this._ats = value;
  }

  set post(value: Operator[]) {
    this._post = value;
  }

  set television(value: Operator[]) {
    this._television = value;
  }

  sortByLocationFeatures(features: LocationFeatures): ExistingOperators {
    this.cellular = this.sortByLocationFeature(features.cellular, this.cellular);
    this.television = this.sortByLocationFeature(features.television, this.television);
    this.post = this.sortByLocationFeature(features.post, this.post);
    this.ats = this.sortByLocationFeature(features.ats, this.ats);
    this.internet = this.sortByLocationFeature(features.internet, this.internet);
    this.radio = this.sortByLocationFeature(features.radio, this.radio);
    return this;
  }

  private sortByLocationFeature(locationFeature: LocationFeature[], operators: Operator[]) {
    locationFeature.reverse().forEach(c => {
      operators = popToTop(operators, c.operator);
    });

    return operators;
  }
}
