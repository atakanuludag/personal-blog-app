export default interface ListResponseModel<T> {
  readonly totalResults: number
  readonly totalPages: number
  readonly pageSize: number
  readonly currentPage: number
  readonly currentPageSize: number
  readonly hasNextPage: boolean
  readonly results: T
}
