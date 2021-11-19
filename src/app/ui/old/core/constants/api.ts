import {environment} from '../../../environments/environment';

export const TECHNICAL_CAPABILITIES = '/api/technical-capabilities';

export const ORGANIZATIONS = '/api/organization';
export const ORGANIZATION_SAVE = '/api/organization/';
export const ORGANIZATION_EDIT = '/api/organization/:id/';
export const ORGANIZATION_AP = '/api/organization/:id/ap/';
export const ORGANIZATION_CREATE_AP = '/api/organization/:id/ap/';
export const ORGANIZATION_INIT_MONITORING_AP = '/api/organization/:id/ap/:apid/init-monitoring';
export const ORGANIZATION_REPORT_MONITORING_TECH = '/api/report/organization/export/map/tech';
export const ORGANIZATION_REPORT_MONITORING_AVAILABILITY = '/api/report/organization/export/map/availability';
export const ORGANIZATION_REPORT_MONITORING_UNAVAILABILITY = '/api/report/organization/export/map/unavailability';

export const INTERNET_ACCESS_TYPES = '/api/type/internet-access/';

export const GOVERNMENT_PROGRAM = `${environment.API_BASE_URL}/api/gov-program`;

export const ACCOUNT_INFO = '/auth/account_info';
export const LOGIN = '/auth/login/';
export const ESIA_LOGIN = '/auth/get_token/';

export const OPERATORS = '/api/operator/grouped';
export const INTERNET_PROVIDER = `${environment.API_BASE_URL}/api/operator/internet`;
export const MOBILE_PROVIDER = `${environment.API_BASE_URL}/api/operator/mobile`;

export const ACCESS_POINT_TYPE = 'api/type/access-point/';
export const ACCESS_POINT_MONITORING = 'api/report/organization/ap-all/monitoring/';
export const ACCESS_POINT_NOTIFICATIONS = 'api/monitoring-notification';

export const IMPORT_LOCATION = '/api/import/location';
export const IMPORT_TC_INTERNET = '/api/import/tc-internet';
export const IMPORT_TC_MOBILE = '/api/import/tc-mobile';
export const IMPORT_TC_PAYPHONE = '/api/import/tc-payphone';
export const IMPORT_TC_TV = '/api/import/tc-tv';
export const IMPORT_TC_RADIO = '/api/import/tc-radio';
export const IMPORT_TC_POST = '/api/import/tc-post';
export const IMPORT_ACCESS_POINT = '/api/import/access-point';
export const IMPORT_TRUNK_CHANNEL = '/api/import/trunk-channel';
export const IMPORT_TC_ATS = '/api/import/tc-ats';
export const IMPORT_TC_INFOMAT = '/api/import/tc-infomat';
export const IMPORT_BASE_STATION = '/api/import/base-station';
