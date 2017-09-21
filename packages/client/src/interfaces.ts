import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "./api/base";
import {Partial} from "ht-models";
import {HtUsersApi} from "./api/users";
import {HtActionsApi} from "./api/actions";
import {Store} from "./store/store";
import * as fromRoot from "./reducers";

export const defaultListConfig: IListConfig = {
  isLive: false,
};

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  indexOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>,
  listApiType?: ApiType,
  dateRangeOptions?: IDateRange,
}

export interface IActionsClientOptions {
  listClientOptions?: Partial<IListClientOptions<HtActionsApi>>,
  getClientOptions?: Partial<IItemClientOptions<HtActionsApi>>
}

export interface IDateRange {
  start: string,
  end: string
}

export interface IIndexQuery {
  pageQuery: object,
  listQuery: object,
  dateRangeQuery: object
}

export interface IListConfig {
  initialQuery?: object,
  isLive?: boolean
}

export interface IListClientOptions<A> {
  query?: object,
  querySource$: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  id?: string,
  defaultQuery?: object,
  api: HtBaseApi | any,
  onDataUpdate: (data) => void,
  pollTime?: number,
  dateRangeSource$?: Observable<object>,
  loadingDispatcher: any,
  store: Store<fromRoot.State>
}

export interface IItemClientOptions<A> {
  query?: object,
  querySource$: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  defaultQuery?: object,
  api: HtBaseApi,
  id?: string,
  onNotFound?: () => void,
  onDataUpdate: (data) => void,
  pollTime?: number,
  dateRangeSource$?: Observable<object>,
  loadingDispatcher: any,
  store: Store<fromRoot.State>
}

export interface IBaseClientOptions<A> extends Partial<IListClientOptions<A>>, Partial<IItemClientOptions<A>>{
  api: HtBaseApi
}

export interface IClientOptions {
  actionsClientOptions?: IActionsClientOptions,
  usersClientOptions?: IUsersClientOptions
}

/**
 * @interface Options for
 */
export interface DataObserverOptions<T> {
  initialData?: T,
  dataSource$?: Observable<T>
}

/**
 * Observable for placeline segment selection
 * @type selectedId: Used as hover state of segment
 * @type resetBoundsId: Used as selection state of segment
 */
export interface PlacelineSegmentId {
  selectedId?: string | null,
  resetBoundsId?: string | null,
  highlightedId?: string | null,
}

export interface AllData<T> {
  results: T[],
  isFirst: boolean,
  timestamp?: string,
  count?: number
}

export enum ApiType {
  index = 'index',
  analytics = 'analytics'
}

