import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "./api/base";
import {Partial} from "ht-models";
import {IUsersClientOptions} from "./entities/users/users-client";
import {IActionsClientOptions} from "./entities/actions/actions-client";

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

export interface IListClientOptions<A> {
  query?: object,
  querySource$?: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  id?: string,
  defaultQuery?: object,
  api: HtBaseApi | any,
  onDataUpdate?: (data) => void,
  pollTime?: number,
  dateRangeSource$?: Observable<object>
}

export interface IItemClientOptions<A> {
  query?: object,
  querySource$?: Observable<object>,
  loadingSource$?: Observable<boolean>,
  idSource$?: Observable<string | number>
  defaultQuery?: object,
  api: HtBaseApi,
  id?: string,
  onNotFound?: () => void,
  onDataUpdate?: (data) => void,
  pollTime?: number,
  dateRangeSource$?: Observable<object>
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
