import {LocationDetail} from '@api/dto/LocationDetail';
import {LocationTableItem} from '@service/dto/LocationTableItem';
import {Operators} from '@api/dto/Operators';

export abstract class LocationTableItemConverter {
  abstract convert(location: LocationDetail, operator: Operators): LocationTableItem;
}

