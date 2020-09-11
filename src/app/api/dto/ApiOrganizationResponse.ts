export interface AORInternetAccess {
  id: number;
  name: string;
}

export interface AORAccessPoint {
  id: number;
  address: string;
  contractor: string;
  customer: string;
  declaredSpeed: string;
  internetAccess: AORInternetAccess;
  type: string;
  opened: boolean;
}

export interface AORLocation {
  id: number;
  parent: string;
  fullName: string;
  name: string;
  type: string;
  population: number;
}

export interface ApiOrganizationResponse {
  id: number;
  acronym: string;
  name: string;
  inn: string;
  kpp: string;
  fias: string;
  address: string;
  location: AORLocation;
  accesspoints: AORAccessPoint[];
  opened: boolean;
}
