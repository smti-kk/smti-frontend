export interface PaginatedListBackend {
  count: number;
  next: string;
  previous: string;
  results: {}[];
}
