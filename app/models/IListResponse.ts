export default interface IListResponse {
    totalResults: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    currentPageSize: number;
    results: any;
}