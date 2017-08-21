
export const defaultListConfig: IListConfig = {
  isLive: false,
  autoLive: false
};

export interface IIndexQuery {
  pageQuery: object,
  listQuery: object,
  dateRangeQuery: object
}

export interface IListConfig {
  isLive: boolean,
  autoLive: boolean
}