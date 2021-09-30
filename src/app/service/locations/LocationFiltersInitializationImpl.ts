import {forkJoin, Observable} from 'rxjs';
import {LocationFilters} from '../../ui/locations-page/location-filters/LocationFilters';
import {LocationFiltersInitialization} from './LocationFiltersInitialization';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {PostTypeApi} from '@api/post-type/PostTypeApi';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {map} from 'rxjs/operators';

export class LocationFiltersInitializationImpl implements LocationFiltersInitialization {
  private readonly operatorsApi: OperatorsApi;
  private readonly trunkChannelTypeApi: TrunkChannelTypeApi;
  private readonly mobileTypeApi: MobileTypeApi;
  private readonly postTypeApi: PostTypeApi;
  private readonly tvTypeApi: TvTypeApi;

  constructor(operatorsApi: OperatorsApi,
              trunkChannelTypeApi: TrunkChannelTypeApi,
              mobileTypeApi: MobileTypeApi,
              postTypeApi: PostTypeApi,
              tvTypeApi: TvTypeApi) {
    this.operatorsApi = operatorsApi;
    this.trunkChannelTypeApi = trunkChannelTypeApi;
    this.mobileTypeApi = mobileTypeApi;
    this.postTypeApi = postTypeApi;
    this.tvTypeApi = tvTypeApi;
  }

  init(): Observable<LocationFilters> {
    return forkJoin([
      this.operatorsApi.get(),
      this.trunkChannelTypeApi.list(),
      this.mobileTypeApi.list(),
      this.tvTypeApi.list(),
      this.postTypeApi.list()
    ]).pipe(
      map(([
             operators,
             channelTypes,
             mobileTypes,
             tvTypes,
             postTypes]) => {
        return {
          cellularOperators: operators.mobile.map(value => {
            return {
              id: value.id,
              isSelected: false,
              label: value.icon,
              name: value.name
            };
          }),
          internetOperators: operators.internet.map(value => {
            return {
              id: value.id,
              isSelected: false,
              label: value.icon,
              name: value.name
            };
          }),
          location: '',
          parent: [],
          connectionType: channelTypes.map(ct => {
            return {
              label: ct.name,
              id: ct.id,
              isSelected: false,
            };
          }),
          signalLevel: mobileTypes.map(st => {
            return {
              isSelected: false,
              id: st.id,
              label: st.name
            };
          }),
          postType: postTypes.map((pt: any) => {
            return {
              id: pt.id,
              label: pt.name,
              isSelected: false
            };
          }),
          tvType: tvTypes.map(tt => {
            return {
              id: tt.id,
              label: tt.name,
              isSelected: false
            };
          }),
          govProgram: null,
          hasZSPD: false,
          hasRSZO: false,
          hasSMO: false,
          hasESPD: false,
          logicalCondition: 'AND',
          hasATS: null,
          hasInfomat: null,
          hasPayphone: null,
          hasRadio: null,
          hasCellular: null,
          hasInternet: null,
          ordering: null,
          govYear: null,
          populationRightBorder: null,
          populationLeftBorder: null
        };
      })
    );
  }
}
