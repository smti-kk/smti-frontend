import {autoserializeAs, deserializeAs, serializeAs} from 'cerialize';
import {Location} from '@core/models/location';
import {AtsFeature} from '@core/models/ats-feature';
import {LocationFeature} from '@core/models/location-feature';
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
  private readonly _location: Location;

  @autoserializeAs(CellularFeature, 'cellular')
  private readonly _cellular: CellularFeature[];

  @autoserializeAs(RadioFeature, 'radio')
  private readonly _radio: RadioFeature[];

  @autoserializeAs(InternetFeature, 'internet')
  private readonly _internet: InternetFeature[];

  @autoserializeAs(AtsFeature, 'ats')
  private readonly _ats: AtsFeature[];

  @autoserializeAs(PostFeature, 'post')
  private readonly _post: PostFeature[];

  @autoserializeAs(TelevisionFeature, 'television')
  private readonly _television: TelevisionFeature[];

  @autoserializeAs('comment')
  private readonly _comment: string;

  constructor(
    location: Location,
    cellular: CellularFeature[],
    radio: RadioFeature[],
    internet: InternetFeature[],
    ats: AtsFeature[],
    post: PostFeature[],
    television: TelevisionFeature[]
  ) {
    this._location = location;
    this._cellular = cellular;
    this._radio = radio;
    this._internet = internet;
    this._ats = ats;
    this._post = post;
    this._television = television;
  }


  get comment(): string {
    return this._comment;
  }

  get location(): Location {
    return this._location;
  }

  get cellular(): CellularFeature[] {
    return this._cellular;
  }

  get radio(): RadioFeature[] {
    return this._radio;
  }

  get internet(): InternetFeature[] {
    return this._internet;
  }

  get ats(): AtsFeature[] {
    return this._ats;
  }

  get post(): PostFeature[] {
    return this._post;
  }

  get television(): TelevisionFeature[] {
    return this._television;
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

  get activeInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.active;
    });
  }

  get archiveInternetFeatures(): InternetFeature[] {
    return this.internet.filter(value => {
      return value.archive;
    });
  }

  get planYearInternetFeatures() {
    return this.internet.filter(value => {
      return value.planYear;
    });
  }

  get planTwoYearInternetFeatures() {
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
}
