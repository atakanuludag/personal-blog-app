interface IPagination {
    pageSize: number;
    page: number;
    skip: number;
}

export interface IQuery {
    searchQuery: any;
    pagination: IPagination;
    order: any;
}

export interface IListQueryResponse {
    totalResults: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    currentPageSize: number;
    results: any;
}

export enum OrderBy {
    DESC = "DESC",
    ASC = "ASC"
}