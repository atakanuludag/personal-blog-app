interface IPagination {
  pageSize: number
  page: number
  skip: number
}

export interface IQuery {
  paging: boolean
  searchQuery: any
  pagination?: IPagination
  order: any
}

export interface IListQueryResponse<T> {
  totalResults: number
  totalPages: number
  pageSize: number
  currentPage: number
  currentPageSize: number
  hasNextPage: boolean
  results: T
}
