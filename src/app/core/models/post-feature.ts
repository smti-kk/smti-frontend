import {autoserializeAs, inheritSerialization} from 'cerialize';
import {MailType} from '@core/models/enums';
import {LocationFeature} from '@core/models/location-feature';

@inheritSerialization(LocationFeature)
export class PostFeature extends LocationFeature {
  @autoserializeAs('type')
  private readonly _type: MailType;

  get type(): MailType {
    return this._type;
  }
}
