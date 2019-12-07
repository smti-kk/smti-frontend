import { autoserializeAs } from 'cerialize';
import { Location } from '@core/models/location';
import { AtsFeature } from '@core/models/ats-feature';
import { LocationFeature } from '@core/models/location-feature';
import { CellularFeature } from '@core/models/cellular-feature';
import { RadioFeature } from '@core/models/radio-feature';
import { InternetFeature } from '@core/models/internet-feature';
import { TelevisionFeature } from '@core/models/radio-location-feature';

export class LocationFeatures {
  @autoserializeAs(Location, 'location')
  private readonly _location: Location;

  @autoserializeAs(CellularFeature, 'cellular')
  private readonly _cellular: CellularFeature[];

  @autoserializeAs(RadioFeature, 'radio')
  private readonly _radio: RadioFeature[];

  @autoserializeAs(InternetFeature, 'internet')
  private readonly _internet: InternetFeature[];

  @autoserializeAs(AtsFeature, 'ats')
  private readonly _ats: AtsFeature[];

  @autoserializeAs(LocationFeature, 'post')
  private readonly _post: LocationFeature[];

  @autoserializeAs(TelevisionFeature, 'television')
  private readonly _television: TelevisionFeature[];

  constructor(location: Location, cellular: CellularFeature[], radio: RadioFeature[],
              internet: InternetFeature[], ats: AtsFeature[], post: LocationFeature[], television: TelevisionFeature[]) {
    this._location = location;
    this._cellular = cellular;
    this._radio = radio;
    this._internet = internet;
    this._ats = ats;
    this._post = post;
    this._television = television;
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

  get post(): LocationFeature[] {
    return this._post;
  }

  get television(): TelevisionFeature[] {
    return this._television;
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
