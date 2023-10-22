export interface IPagination<T> {
    page: number;
    pages: number;
    countItem: number;
    entities: T;
}