import {Partial} from "ht-models";
import {Observable} from "rxjs/Observable";
import {Store} from "../../store/store";
import {Subscription} from "rxjs/Subscription";

export type ItemApi<T> = (id: string, query: object | null) => Observable<T>;
export type ListApi<T> = (query: object | null) => Observable<T>;

export interface Dispatchers {
  setData: (data) => any,
  setLoading: (data) => any,
  setQuery: (data: object) => any
};

export interface Selectors {
  query$: Observable<object | null | undefined>
  data$: Observable<any>,
  loading$: Observable<boolean | string>,
  id$?: Observable<string | null| undefined>
};

export interface EntityTypeConfig {
  name: string,
  defaultQuery: object,
  pollDuration: number,
  updateStrategy: string,
  allowedQueryKeys: string[], null
}

export interface EntityTypeState {
  store: Store<any>,
  selectors?: Selectors,
  dispatchers?: Dispatchers,
}

export interface ListDispatchers extends Dispatchers {
  setActive: (data?: boolean) => any,
  setQueryReset?(query): void,
  clearQueryKey?(key: string): void,
  toggleId?(id: string): void,
  setId?(id): void
}

export interface EntityListDispatchers extends ListDispatchers {

};

export interface GenListSelectors {
  dataArray$: Observable<any[]>,
}

export interface ListSelectors extends Selectors {
  active$: Observable<boolean>,
}

export interface EntityItemDispatchers extends Dispatchers {
  setId: (id: string | null) => any,
  toggleId?: (userId: string) => any,
}


export interface EntityItemSelectors extends Selectors {
  id$: Observable<string | null| undefined>
  query$: Observable<object | null | undefined>
}


