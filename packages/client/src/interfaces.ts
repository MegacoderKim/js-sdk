
import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "./api/base";

export const defaultListConfig: IListConfig = {
  isLive: false,
};

export interface IIndexQuery {
  pageQuery: object,
  listQuery: object,
  dateRangeQuery: object
}

export interface IListConfig {
  initialQuery?: object,
  isLive?: boolean
}

export interface IQueryOptions {
  allowedParams?: string[] | null
  dataSource$?: Observable<object>,
  initialData?: object
}

export interface IListClientOptions extends IQueryOptions{

}

export interface IItemClientOptions {
  queryOptions?: IQueryOptions,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  defaultQuery?: object,
  api: HtBaseApi,
  id?: string,
  onNotFound?: () => void,
  onDataUpdate?: (data) => void,
  pollTime?: number
}