export interface PaginatedListBackend {
  count: number;
  next: string;
  previous: string;
  results: {}[];
}


export interface MatPaginatorEvent {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}
