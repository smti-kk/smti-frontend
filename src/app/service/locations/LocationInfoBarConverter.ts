import {LocationShort} from '@api/dto/LocationShort';
import {Operators} from '@api/dto/Operators';
import {LocationInfoBarValue} from '@service/dto/LocationInfoBarValue';

export abstract class LocationInfoBarConverter {
    abstract convert(location: LocationShort, operators: Operators): LocationInfoBarValue;
}

