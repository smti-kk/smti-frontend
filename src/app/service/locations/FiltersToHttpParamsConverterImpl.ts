import {FiltersToHttpParamsConverter} from './FiltersToHttpParamsConverter';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {HttpParams} from '@angular/common/http';

export const httpParamsConstants = {
  Id2G: '1',
  Id3G: '2',
  Id4G: '3',
  IdVOLS: '3',
  IdMed: '5',
  IdSputnik: '4',
  IdRadio: '6',
  IdBeeline: '3',
  IdMegafon: '4',
  IdTele2: '5',
  IdMts: '6',
  IdRtrs: '7',
  IdSibttk: '8',
  IdRtk: '9',
  IdIskra: '10',
};

export class FiltersToHttpParamsConverterImpl implements FiltersToHttpParamsConverter {
  convert(locationFilters: LocationFilters): HttpParams {
    let params = new HttpParams();
    // if (locationFilters.is2G) {
    //   params = params.append('mobile-type', httpParamsConstants.Id2G);
    // }
    // if (locationFilters.is3G) {
    //   params = params.append('mobile-type', httpParamsConstants.Id3G);
    // }
    // if (locationFilters.is4G) {
    //   params = params.append('mobile-type', httpParamsConstants.Id4G);
    // }
    // if (locationFilters.isMed) {
    //   params = params.append('internet-type', httpParamsConstants.IdMed);
    // }
    // if (locationFilters.isVOLS) {
    //   params = params.append('internet-type', httpParamsConstants.IdVOLS);
    // }
    // if (locationFilters.isRadio) {
    //   params = params.append('internet-type', httpParamsConstants.IdRadio);
    // }
    // if (locationFilters.isSputnik) {
    //   params = params.append('internet-type', httpParamsConstants.IdSputnik);
    // }
    // if (locationFilters.isBeelineInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdBeeline);
    // }
    // if (locationFilters.isMegaphoneInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdMegafon);
    // }
    // if (locationFilters.isMTSInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdMts);
    // }
    // if (locationFilters.isTele2Internet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdTele2);
    // }
    // if (locationFilters.isRostelecomInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdRtk);
    // }
    // if (locationFilters.isSibTTKInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdSibttk);
    // }
    // if (locationFilters.isIskraInternet) {
    //   params = params.append('internet-operators', httpParamsConstants.IdIskra);
    // }
    // if (locationFilters.isBeelineCellular) {
    //   params = params.append('cellular-operators', httpParamsConstants.IdBeeline);
    // }
    // if (locationFilters.isMegaphoneCellular) {
    //   params = params.append('cellular-operators', httpParamsConstants.IdMegafon);
    // }
    // if (locationFilters.isMTSCellular) {
    //   params = params.append('cellular-operators', httpParamsConstants.IdMts);
    // }
    // if (locationFilters.isTele2Cellular) {
    //   params = params.append('cellular-operators', httpParamsConstants.IdTele2);
    // }
    // if (locationFilters.isRostelecomCellular) {
    //   params = params.append('cellular-operators', httpParamsConstants.IdRtk);
    // }
    // params = params.append('location', locationFilters.location);
    if(typeof locationFilters.location === 'string'){
      params = params.append('locationName', locationFilters.location);
    }
    else {
      for (let i = 0; i < locationFilters.location.length; i++){
        params = params.append('locationName', locationFilters.location[i]);
      }
    }
    // params = params.append('parent', locationFilters.parent);
    // params = params.append('is-logical-or', `${locationFilters.isLogicalOr}`);
    return params;
  }
}
