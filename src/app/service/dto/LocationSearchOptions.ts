export interface LocationSearchItem {
  label: string;
  id: number;
}

export interface LocationSearchGroup {
  label: string;
  id: number;
  locations: LocationSearchItem[];
}
