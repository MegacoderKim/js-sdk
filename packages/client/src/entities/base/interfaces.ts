import {Partial} from "ht-models";
import {Observable} from "rxjs/Observable";
import {Store} from "../../store/store";
import {IDateRange} from "../../interfaces";

export type ItemApi<T> = (id: string, query: object | null) => Observable<T>;
export type ListApi<T> = (query: object | null) => Observable<T>;

export interface Dispatchers {
  setData: (data) => any,
  setLoading: (data) => any,
};

export type GetData<T> = (queryArray: any[]) => Observable<T>

export interface Selectors {
  query$: Observable<object>
  data$: Observable<any>,
  loading$: Observable<boolean | string>,
};

export interface ReqSelectors {
  apiQuery$: Observable<any[] | null>,
}

export interface EntityTypeConfig {
  name: string,
  defaultQuery: object,
  pollDuration: number,
  updateStrategy: string,
}

export type EntityTypeConfigFactory = (config: Partial<EntityTypeConfig>) => EntityTypeConfig

export interface EntityTypeState {
  store: Store<any>,
  firstDataEffect?: (data) => any,
  selectors?: Selectors,
  dispatchers?: Dispatchers,
}

export interface EntityType extends EntityTypeConfig {
  // selectors: Selectors,
  // dispatchers: Dispatchers,
}

type EntityTypeFactory = () => EntityType

/**
 * list
 */

export interface ListDispatchers extends Dispatchers {
  setActive: (data?: boolean) => any
}

export interface EntityListDispatchers extends ListDispatchers {

};

export interface GenListSelectors extends ReqSelectors {
  dataArray$: Observable<any[]>,
}

export interface ListSelectors extends Selectors {
  active$: Observable<boolean>,
}

export interface EntityListSelectors extends ReqSelectors, ListSelectors {
  dateRangeQuery$?: Observable<object>,
}

export interface PublicEntityListState {
  api$: (query: object) => Observable<any>
};

export interface ListState extends EntityTypeState, PublicEntityListState {
  dateRangeParam?: string
  dateRangeQuery$?: Observable<object>,
}

export interface EntityListState extends ListState, PublicEntityListState {
  selectors: ListSelectors,
  dispatchers: ListDispatchers,
  allowedQueryKeys?: string[] | null
}

export interface EntityList extends EntityTypeConfig, PublicEntityListState {
  selectors: GenListSelectors,
}

export type EntityListFactory = (entityListState: ListState, config: Partial<EntityTypeConfig>) => EntityList

/**
 * item
 */
export interface ItemDispatchers {

}

export interface EntityItemDispatchers extends Dispatchers {
  setId: (id: string | null) => any,
  toggleId?: (userId: string) => any
}

export interface GenItemSelectors extends ReqSelectors{


}

export interface EntityItemSelectors extends Selectors {
  id$: Observable<string | null>
}

export interface PublicEntityItemState {
  api$: (id: string, query: object) => Observable<any>
}

export interface EntityItemState extends EntityTypeState, PublicEntityItemState {
  selectors: EntityItemSelectors,
  dispatchers: EntityItemDispatchers,
};

export interface ItemState extends EntityTypeState, PublicEntityItemState {

}

export interface EntityItem extends PublicEntityItemState, EntityTypeConfig {
  selectors: GenItemSelectors,
  // dispatchers: EntityItemDispatchers
}


export type EntityItemFactory = (state: EntityTypeState, config: Partial<EntityTypeConfig>) => EntityItem;
