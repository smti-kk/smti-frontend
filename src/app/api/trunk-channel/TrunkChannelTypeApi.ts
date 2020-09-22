import {TrunkChannelType} from '../dto/TrunkChannelType';
import {Observable} from 'rxjs';

export abstract class TrunkChannelTypeApi {
  abstract list(): Observable<TrunkChannelType[]>;
}

