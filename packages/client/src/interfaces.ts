
import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "./api/base";
import {Partial} from "ht-models";

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
  // allowedParams?: string[] | null
  dataSource$?: Observable<object>,
  initialData?: object
}

export interface IListClientOptions<A> {
  query?: object,
  querySource$?: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  id?: string,
  defaultQuery?: object,
  api: A,
  onDataUpdate?: (data) => void,
  pollTime?: number
}

export interface IItemClientOptions<A> {
  query?: object,
  querySource$?: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  defaultQuery?: object,
  api: A,
  id?: string,
  onNotFound?: () => void,
  onDataUpdate?: (data) => void,
  pollTime?: number
}

export interface IBaseClientOptions<A> extends Partial<IListClientOptions<A>>, Partial<IItemClientOptions<A>>{
  api: A
}
