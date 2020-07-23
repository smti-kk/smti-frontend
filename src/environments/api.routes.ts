import {environment} from './environment';

export const API_VERSION = environment.API_BASE_URL + '/api';
export const ACCOUNT_API = environment.API_BASE_URL + '/auth/account_info/';
export const AUTHORIZATION_API = environment.API_BASE_URL + '/auth/login/';
export const API_STATIC = environment.API_BASE_URL + '/media';
export const MAP_LOCATIONS_API = API_VERSION + '/map-locations';
export const MAP_ACCESS_POINTS_API = API_VERSION + '/map-access-points';
export const OPERATORS_API = API_VERSION + '/operator';
export const LOCATION_DETAIL_API = API_VERSION + '/detail-locations';
export const DLOCATION_BASE_API = API_VERSION + '/location/base/';
export const TRUNK_CHANNEL_TYPES_API = API_VERSION + '/type/trunk-channel/';
export const MOBILE_TYPES_API = API_VERSION + '/type/mobile/';
export const POST_TYPES_API = API_VERSION + '/type/post/';
export const TV_TYPES_API = API_VERSION + '/type/tv/';
export const LOCATION_AREAS_API = API_VERSION + '/detail-locations/parents';
export const GOV_PROGRAM_API = API_VERSION + '/gov-program';
export const USERS_API = API_VERSION + '/user/';
