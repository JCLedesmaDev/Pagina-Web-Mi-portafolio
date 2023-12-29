export interface IFilterPaginationDb {
    page: number;
    limitPage: number;
    dateFrom: Date;
    dateUntil: Date;
    userId?: string;
    typeEvent?: string;
}
