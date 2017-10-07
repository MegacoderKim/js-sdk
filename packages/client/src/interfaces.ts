import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "./api/base";
import {Partial, IUserData, Page, IUser, IUserAnalytics, IAction} from "ht-models";
import {HtUsersApi} from "./api/users";
import {HtActionsApi} from "./api/actions";
import {Store} from "./store/store";
import * as fromRoot from "./reducers";

export const defaultListConfig: IListConfig = {
  isLive: false,
};

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<IUserData>>,
  indexOptions?: Partial<IListClientOptions<Page<IUser>>>,
  analyticsOptions?: Partial<IListClientOptions<Page<IUserAnalytics>>>,
  listApiType?: ApiType,
  dateRangeOptions?: IDateRange,
}

export interface IActionsClientOptions {
  listClientOptions?: Partial<IListClientOptions<Page<IAction>>>,
  getClientOptions?: Partial<IItemClientOptions<IAction>>
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

export interface IListClientOptions<T> {
  query?: object,
  // querySource$: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  id?: string,
  defaultQuery?: object,
  api$: (query) => Observable<T>,
  pollTime?: number,
  dateRangeSource$?: Observable<object>,
  loadingDispatcher: any,
  store: Store<fromRoot.State>
}

export interface IItemClientOptions<T> {
  query?: object,
  // querySource$: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  defaultQuery?: object,
  api$: (id, query) => Observable<T>,
  id?: string,
  onNotFound?: () => void,
  pollTime?: number,
  dateRangeSource$?: Observable<object>,
  loadingDispatcher: any,
  store: Store<fromRoot.State>
}

// export interface IBaseClientOptions<T> extends Partial<IListClientOptions<T>>, Partial<IItemClientOptions<T>>{
//
// }

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
  resultsEntity: {[id: string]: T},
  isFirst: boolean,
  timestamp?: string,
  count?: number,
  next?: string,
  previous?: string
}

export enum ApiType {
  index = 'index',
  analytics = 'analytics'
}

export interface QueryLabel {
  label: string,
  values: string[],
  value?: string,
  color?: string
}

