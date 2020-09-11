import {HttpXhrBackend, ɵangular_packages_common_http_http_d} from '@angular/common/http';
import {Provider} from '@angular/core';
import {GovProgramService} from './gov-program/GovProgramService';
import {GovProgramServiceImpl} from './gov-program/GovProgramServiceImpl';
import {GovProgramApiImpl} from '@api/gov-program/GovProgramApiImpl';
import {SelectAreasService} from '@service/area/SelectAreasService';
import {SelectAreasServiceImpl} from '@service/area/SelectAreasServiceImpl';
import {LAACacheable} from '@api/area/LAACachable';
import {LocationAreaApiImpl} from '@api/area/LocationAreaApiImpl';
import {HttpService} from '@api/http-client/HttpService';
import {AuthInterceptor} from '@api/auth.interceptor';
import {LocalStorageService} from '../storage/local-storage.service';
import {OACacheable} from '@api/operators/OACacheable';
import {OperatorsApiImpl} from '@api/operators/OperatorsApiImpl';
import {TCTACacheable} from '@api/trunk-channel/TCTACacheable';
import {TrunkChannelTypeApiImpl} from '@api/trunk-channel/TrunkChannelTypeApiImpl';
import {MTACacheable} from '@api/mobile-type/MTACacheable';
import {MobileTypeApiImpl} from '@api/mobile-type/MobileTypeApiImpl';
import {PTACacheable} from '@api/post-type/PTACacheable';
import {PostTypeApiImpl} from '@api/post-type/PostTypeApiImpl';
import {TTCacheable} from '@api/tv-type/TTCacheable';
import {TvTypeApiImpl} from '@api/tv-type/TvTypeApiImpl';
import {ThrottleImpl} from '@service/util/ThrottleImpl';
import {TvTypeApi} from '@api/tv-type/TvTypeApi';
import {PostTypeApi} from '@api/post-type/PostTypeApi';
import {MobileTypeApi} from '@api/mobile-type/MobileTypeApi';
import {TrunkChannelTypeApi} from '@api/trunk-channel/TrunkChannelTypeApi';
import {OperatorsApi} from '@api/operators/OperatorsApi';
import {AccountServiceImpl} from '@service/account/AccountServiceImpl';
import {AccountApiImpl} from '@api/account/account.api.impl';
import {AccountConverterFromApi} from '@service/account/AccountConverterImpl';
import {RoleConverterFromStringArray} from '@service/account/RoleConverterImpl';
import {AccountService} from '@service/account/AccountService';
import {AuthorizationService} from '@service/authorization/authorization.service';
import {WithUpdateUser} from '@service/authorization/with-account-service.decorator';
import {AuthorizationServiceImpl} from '@service/authorization/authorization.service.impl';
import {AuthorizationApiImpl} from '@api/authorization/authorization.api.impl';
import {LayerControllersFactory} from '@service/leaflet-config/layer-controllers-factory.service';
import {
  LeafletOptionsConfigurator,
  LeafletOptionsConfiguratorImpl
} from '@service/leaflet-config/LeafletOptionsConfigurator';
import {CurrentLatLngServiceImpl} from '@service/leaflet-config/CurrentLatLngService';
import {GeobytesComIpInfoApi} from '@api/ip-info.api';
import {LatLngFromApiConverterImpl} from '@service/util/LatLngFromApiConverterImpl';
import {SearchService} from '@service/location-search/SearchService';
import {SSThrottled} from '@service/location-search/SSThrottled';
import {SearchServiceImpl} from '@service/location-search/SearchServiceImpl';
import {LocationSearchResultConverterImpl} from '@service/location-search/LocationSearchResultConverterImpl';
import {TCTAExcludeUndefined} from '@api/trunk-channel/TCTAExcludeUndefined';
import {
  FiltersToHttpParamsConverterImpl,
  LFISFullPreloaded,
  LFISThrottled,
  LocationFilterFormBuilder,
  LocationFilterFormBuilderImpl,
  LocationFiltersInitializationImpl,
  LocationInfoBarConverterImpl,
  LocationsFiltrationImpl,
  LocationsFullInformationService,
  LocationsFullInformationServiceImpl,
  LocationsService,
  LocationsServiceImpl,
  LocationTableItemConverterImpl,
  LSWithDelay,
  OperatorIconsFactoryImpl,
  StrictFilterImpl
} from '@service/locations';
import {LocationDetailApiImpl} from '@api/locations/LocationDetailApiImpl';
import {LocationsApiImpl} from '@api/locations/LocationsApiImpl';
import {LocationSearchApiImpl} from '@api/locations/LocationSearchApiImpl';
import {DetailLocations} from '@service/locations/DetailLocations';
import {DetailLocationsFromApi} from '@service/locations/DetailLocationsFromApi';
import {DLocationsServiceImpl} from '@service/locations/DLocationsServiceImpl';
import {DLocationBaseApiImpl} from '@api/locations/DLocationBaseApiImpl';
import {DLocationsService} from '@service/locations/DLocationsService';
import {UsersServiceImpl} from '@service/account/UsersServiceImpl';
import {UsersApiImpl} from '@api/account/UsersApiImpl';
import {UsersService} from '@service/account/UsersService';
import {LocationFeaturesImpl} from '@api/location-features/LocationFeaturesImpl';
import {GPSCacheable} from '@service/gov-program/GPSCacheable';
import {LocationDetailApi} from '@api/locations/LocationDetailApi';
import {CurrentYearService, CurrentYearServiceImpl} from '@service/util/CurrentYearService';
import {FeaturesComparingServiceImpl} from '@service/features-comparing/FeaturesComparingServiceImpl';
import {LocationFCApiImpl} from '@api/features-comparing/LocationFCApiImpl';
import {FeaturesComparingService} from '@service/features-comparing/FeaturesComparingService';
import {ApiFeaturesRequests} from '@api/features-requests/ApiFeaturesRequests';
import {ApiFeaturesRequestsImpl} from '@api/features-requests/ApiFeaturesRequestsImpl';
import {MunicipalitiesLayer} from '@service/leaflet-config/MunicipalitiesLayer';
import {MunicipalitiesApi, MunicipalitiesApiImpl} from '@api/municipalities-api/MunicipalitiesApi';
import {BaseStationsApi} from '@api/base-stations/BaseStationsApi';
import {TrunkChannelsApi} from '@api/trunk-channels/TrunkChannelsApi';
import {MapLocationsApiImpl} from '@api/locations/MapLocationsApiImpl';
import {MapLocationsApi} from '@api/locations/MapLocationsApi';
import {BoundsToStringConverter} from '@api/util/bounds.to.string.converter';
import {ApiOrganization} from '@api/organizations/ApiOrganization';
import {AccessPointsApi} from '@api/access-points/AccessPointsApi';
import {MTAWithout5G} from '@api/mobile-type/MTAWithout5G';
import {MACacheable} from '@api/municipalities-api/MACacheable';
import {OrganizationsService} from '@core/services';

export const factory = (): Provider[] => {
  // noinspection JSNonASCIINames
  const httpClient = new HttpService(
    new HttpXhrBackend(
      new ɵangular_packages_common_http_http_d()
    ),
    [
      new AuthInterceptor(
        new LocalStorageService()
      )
    ]
  );
  const govProgramService: GovProgramService = new GPSCacheable(
    new GovProgramServiceImpl(
      new GovProgramApiImpl(httpClient)
    )
  );
  const selectAreasService: SelectAreasService = new SelectAreasServiceImpl(
    new LAACacheable(
      new LocationAreaApiImpl(httpClient)
    )
  );
  const operatorsApi: OperatorsApi = new OACacheable(
    new OperatorsApiImpl(httpClient)
  );
  const locationDetailApi = new LocationDetailApiImpl(httpClient);
  const trunkChannelTypeApi: TrunkChannelTypeApi = new TCTAExcludeUndefined(
    new TCTACacheable(
      new TrunkChannelTypeApiImpl(httpClient)
    )
  );
  const mobileTypeApi: MobileTypeApi = new MTAWithout5G(
    new MTACacheable(
      new MobileTypeApiImpl(httpClient)
    )
  );
  const postTypeApi: PostTypeApi = new PTACacheable(
    new PostTypeApiImpl(httpClient)
  );
  const tvTypeApi: TvTypeApi = new TTCacheable(
    new TvTypeApiImpl(httpClient)
  );
  const locationFilterFormBuilder: LocationFilterFormBuilder = new LocationFilterFormBuilderImpl(
    new LocationFiltersInitializationImpl(
      operatorsApi,
      trunkChannelTypeApi,
      mobileTypeApi,
      postTypeApi,
      tvTypeApi
    )
  );
  const locationsFullInformationService: LocationsFullInformationService = new LFISThrottled(
    // new LFISFilterNullSafely(
    new LFISFullPreloaded(
      new LocationsFullInformationServiceImpl(
        locationDetailApi,
        new LocationTableItemConverterImpl(
          new OperatorIconsFactoryImpl()
        ),
        operatorsApi,
        new FiltersToHttpParamsConverterImpl()
      ),
      locationDetailApi,
      new LocationsFiltrationImpl(
        new StrictFilterImpl()
      ),
      // ),
    ),
    new ThrottleImpl(1)
  );
  const locationsService: LocationsService = new LSWithDelay(
    new LocationsServiceImpl(
      new LocationsApiImpl(httpClient),
      operatorsApi,
      new LocationInfoBarConverterImpl(
        new OperatorIconsFactoryImpl()
      )
    )
  );
  const accountService: AccountService = new AccountServiceImpl(
    new AccountApiImpl(httpClient),
    new AccountConverterFromApi(
      new RoleConverterFromStringArray()
    )
  );
  const authorizationService: AuthorizationService = new WithUpdateUser(
    new AuthorizationServiceImpl(
      new AuthorizationApiImpl(httpClient),
      new LocalStorageService()
    ),
    accountService
  );
  const leafletOptionsConfigurator: LeafletOptionsConfigurator = new LeafletOptionsConfiguratorImpl(
    new CurrentLatLngServiceImpl(
      new GeobytesComIpInfoApi(httpClient),
      new LatLngFromApiConverterImpl()
    ),
  );
  const searchService: SearchService = new SSThrottled(
    new SearchServiceImpl(
      new LocationSearchApiImpl(httpClient),
      new LocationSearchResultConverterImpl()
    ),
    new ThrottleImpl(500)
  );
  const detailLocations: DetailLocations = new DetailLocationsFromApi(
    locationDetailApi,
    new LocationFeaturesImpl(httpClient)
  );
  const usersService = new UsersServiceImpl(
    new UsersApiImpl(httpClient)
  );
  const dLocationsService = new DLocationsServiceImpl(
    new DLocationBaseApiImpl(httpClient)
  );
  const currentYearService = new CurrentYearServiceImpl();
  const featuresComparingService = new FeaturesComparingServiceImpl(
    new LocationFCApiImpl(httpClient),
    currentYearService
  );
  const apiFeaturesRequests = new ApiFeaturesRequestsImpl(httpClient);
  const trunkChannelsApi = new TrunkChannelsApi(httpClient);
  const layerControllersFactory: LayerControllersFactory = new LayerControllersFactory(httpClient);
  const apiOrganization = new ApiOrganization(httpClient);
  const accessPointsApi = new AccessPointsApi(httpClient);
  return [
    {
      provide: GovProgramService,
      useValue: govProgramService,
    },
    {
      provide: SelectAreasService,
      useValue: selectAreasService
    },
    {
      provide: LocationFilterFormBuilder,
      useValue: locationFilterFormBuilder
    },
    {
      provide: LocationsFullInformationService,
      useValue: locationsFullInformationService
    },
    {
      provide: LocationsService,
      useValue: locationsService
    },
    {
      provide: AccountService,
      useValue: accountService
    },
    {
      provide: AuthorizationService,
      useValue: authorizationService
    },
    {
      provide: LayerControllersFactory,
      useValue: layerControllersFactory
    },
    {
      provide: LeafletOptionsConfigurator,
      useValue: leafletOptionsConfigurator
    },
    {
      provide: SearchService,
      useValue: searchService
    },
    {
      provide: MobileTypeApi,
      useValue: mobileTypeApi
    },
    {
      provide: TrunkChannelTypeApi,
      useValue: trunkChannelTypeApi
    },
    {
      provide: OperatorsApi,
      useValue: operatorsApi
    },
    {
      provide: GovProgramService,
      useValue: govProgramService
    },
    {
      provide: PostTypeApi,
      useValue: postTypeApi
    },
    {
      provide: TvTypeApi,
      useValue: tvTypeApi
    },
    {
      provide: DetailLocations,
      useValue: detailLocations
    },
    {
      provide: UsersService,
      useValue: usersService
    },
    {
      provide: DLocationsService,
      useValue: dLocationsService
    },
    {
      provide: LocationDetailApi,
      useValue: locationDetailApi
    },
    {
      provide: CurrentYearService,
      useValue: currentYearService
    },
    {
      provide: FeaturesComparingService,
      useValue: featuresComparingService
    },
    {
      provide: ApiFeaturesRequests,
      useValue: apiFeaturesRequests
    },
    {
      provide: MunicipalitiesApi,
      useValue: new MACacheable(
        new MunicipalitiesApiImpl(httpClient)
      )
    },
    {
      provide: MunicipalitiesLayer,
      useClass: MunicipalitiesLayer
    },
    {
      provide: BaseStationsApi,
      useValue: new BaseStationsApi(httpClient)
    },
    {
      provide: TrunkChannelsApi,
      useValue: trunkChannelsApi
    },
    {
      provide: MapLocationsApi,
      useValue: new MapLocationsApiImpl(httpClient, new BoundsToStringConverter())
    },
    {
      provide: ApiOrganization,
      useValue: apiOrganization
    },
    {
      provide: AccessPointsApi,
      useValue: accessPointsApi
    },
    {
      provide: OrganizationsService,
      useClass: OrganizationsService
    }
  ];
};
