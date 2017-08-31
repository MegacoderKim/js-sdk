export declare const defaultListConfig: IListConfig;
export interface IIndexQuery {
    pageQuery: object;
    listQuery: object;
    dateRangeQuery: object;
}
export interface IListConfig {
    isLive: boolean;
    autoLive: boolean;
}
