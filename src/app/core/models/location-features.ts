import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';

import {Location} from '@core/models/location';
import {AtsFeature} from '@core/models/ats-feature';
import {CellularFeature} from '@core/models/cellular-feature';
import {RadioFeature} from '@core/models/radio-feature';
import {InternetFeature} from '@core/models/internet-feature';
import {TelevisionFeature} from '@core/models/radio-location-feature';
import {GovernmentProgram} from '@core/models/government-program';
import {PostFeature} from '@core/models/post-feature';
import {ID_SERIALIZER} from '@core/utils/serializers';

export class LocationFeatures {
  @deserializeAs(Location, 'location')
  @serializeAs(ID_SERIALIZER, 'location')
  private _location: Location;

  @autoserializeAs(CellularFeature, 'cellular')
  private _cellular: CellularFeature[];

  @autoserializeAs(RadioFeature, 'radio')
  private _radio: RadioFeature[];

  @autoserializeAs(InternetFeature, 'internet')
  private _internet: InternetFeature[];

  @autoserializeAs(AtsFeature, 'ats')
  private _ats: AtsFeature[];

  @autoserializeAs(PostFeature, 'post')
  private _post: PostFeature[];

  @autoserializeAs(TelevisionFeature, 'television')
  private _television: TelevisionFeature[];

  @autoserializeAs('comment')
  private _comment: string;

  constructor(value) {
    Object.assign(this, value);
  }

  get governmentPrograms(): GovernmentProgram[] {
    return [
      ...this.television,
      ...this.ats,
      ...this.radio,
      ...this.internet,
      ...this.post,
      ...this.cellular,
    ]
      .map(locationFeature => locationFeature.governmentProgram)
      .filter(program => program !== null);
  }

  get planYearInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.planYear;
    });
  }

  get planTwoYearInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.planTwoYear;
    });
  }

  get activeCellularFeatures(): CellularFeature[] {
    return this.cellular.filter(value => {
      return value.active;
    });
  }

  get archiveCellularFeatures(): CellularFeature[] {
    return this.cellular.filter(value => {
      return value.archive;
    });
  }

  get archiveInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.archive;
    });
  }

  get planYearCellularFeatures(): CellularFeature[] {
    return this.cellular.filter(value => {
      return value.planYear;
    });
  }

  get planTwoYearCellularFeatures(): CellularFeature[] {
    return this.cellular.filter(value => {
      return value.planTwoYear;
    });
  }

  get activeInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.active;
    });
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  get cellular(): CellularFeature[] {
    return this._cellular;
  }

  set cellular(value: CellularFeature[]) {
    this._cellular = value;
  }

  get radio(): RadioFeature[] {
    return this._radio;
  }

  set radio(value: RadioFeature[]) {
    this._radio = value;
  }

  get internet(): InternetFeature[] {
    return this._internet;
  }

  set internet(value: InternetFeature[]) {
    this._internet = value;
  }

  get ats(): AtsFeature[] {
    return this._ats;
  }

  set ats(value: AtsFeature[]) {
    this._ats = value;
  }

  get post(): PostFeature[] {
    return this._post;
  }

  set post(value: PostFeature[]) {
    this._post = value;
  }

  get television(): TelevisionFeature[] {
    return this._television;
  }

  set television(value: TelevisionFeature[]) {
    this._television = value;
  }
}
