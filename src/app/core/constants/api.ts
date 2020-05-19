import {environment} from '../../../environments/environment';

export const TECHNICAL_CAPABILITIES = '/api/v1/technical-capabilities';

export const ORGANIZATIONS = '/api/organization';
export const ORGANIZATION_SAVE = '/api/organization/';
export const ORGANIZATION_EDIT = '/api/organization/:id/';
export const ORGANIZATION_CREATE_AP = '/api/v1/organization/:id/add_access_point/';

export const INTERNET_ACCESS_TYPES = '/api/type/internet-access/';

export const GOVERNMENT_PROGRAM = `${environment.API_BASE_URL}/api/gov-program`;

export const ACCOUNT_INFO = '/auth/account_info';
export const LOGIN = '/auth/login/';
export const ESIA_LOGIN = '/auth/get_token/';

export const OPERATORS = '/api/operator/grouped';
export const INTERNET_PROVIDER = `${environment.API_BASE_URL}/api/operator/internet`;
export const MOBILE_PROVIDER = `${environment.API_BASE_URL}/api/operator/mobile`;
