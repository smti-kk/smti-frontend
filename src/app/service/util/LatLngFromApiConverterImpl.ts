import {IpInfo} from '@api/dto/IpInfo';
import {LatLng} from 'leaflet';
import {LatLngFromApiConverter} from '@service/util/LatLngFromApiConverter';

export class LatLngFromApiConverterImpl implements LatLngFromApiConverter {
    convert(api: IpInfo): LatLng {
        return new LatLng(parseFloat(api.geobyteslatitude), parseFloat(api.geobyteslongitude));
    }
}
