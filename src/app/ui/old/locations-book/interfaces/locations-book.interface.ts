import {
  LocationType,
  LocationParentType,
} from './../enums/locations-book.enum';

export interface LocationsList {
  content: LocationsContent[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: Sort;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface LocationsContent {
  id: number;
  name: string;
  population: number;
  type: LocationType;
  locationParent: LocationParent;
  fias: string;
  okato: string;
  oktmo: string;
  geoData: LocationGeoData;
}

export interface LocationGeoData {
  id: number;
  administrativeCenter: AdministrativeCenter;
  fias: string;
  okato: string;
  oktmo: string;
  locations: null;
  geometry?: any;
}

export interface AdministrativeCenter {
  lng: number;
  lat: number;
}

export interface LocationParent {
  id: number;
  type: LocationParentType;
  name: string;
  level: number;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface LocationCategories {
  name: string;
  description: string;
  shorted: string;
  canBeParent: boolean;
}


