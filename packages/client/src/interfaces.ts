import {Observable} from "rxjs/Observable";
import {IUserData, Page, IUser, IUserAnalytics} from "ht-models";
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

export interface IDateRange {
  start: string,
  end: string
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

/**
 * @interface Options for
 */
export interface DataObserverOptions<T> {
  initialData?: T,
  dataSource$?: Observable<T>
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

