import {Partial} from "ht-models";
import {Observable} from "rxjs/Observable";
import {IDateRange} from "../../interfaces";

export interface IDispatchers {
  setData: (data) => any,
  setLoading: (data) => any,
  setActive?: (data?: boolean) => any
  setId?: (id: string | null) => any
};

export interface ISelectors {
  query$: Observable<object>
  active$?: Observable<boolean>,
  data$: Observable<any>,
  loading$: Observable<boolean | string>
};

export interface IItemSelectors extends ISelectors {
  id$: Observable<string | null>
};

export interface HEntityType {
  name: string,
  defaultQuery: object,
  pollDuration: number,
  updateStrategy: string,
  firstDataEffect?: (data) => void
}

export interface HEntityTypeClientOptions extends Partial<HEntityType> {
  // id?: string,
  // query?: object,
  // isActive?: boolean
}

export interface HListMethods {
  dataArray$: Observable<any[]>,
  setActive: (isActive?: boolean ) => any
}

export interface HClientConfig {
  apiQuery$: Observable<any[]>,
  // apiData$: Observable<any>,
  getData$: (a: any[]) => Observable<any>,
  // setData$: Observable<any>
  // firstDataEffect?: (data) => void
}

export interface HClient extends HClientConfig {
  // firstDataEffect: (data) => void
}


export interface HEntity extends HEntityType {
  selectors: ISelectors,
  dispatchers: IDispatchers,
  client: HClient,
}

export interface HList extends HEntity, HListMethods {
  dateRangeQuery$: Observable<object>,
}
export interface HItem extends HEntity {
  dateRangeQuery$: Observable<object>,
  // selectors: IItemSelectors
}

export interface HEntityState {
  dateRangeParam?: string,
  dateRangeQuery$?: Observable<IDateRange>,
  // selectors: ISelectors,
  // dispatchers: IDispatchers
}

export interface HEntityTypeFunctions {
  dispatchers: IDispatchers,
  selectors: ISelectors,
  methods: object
}

export interface HEntityItemFunctions {
  dispatchers: IDispatchers,
  selectors: IItemSelectors,
  methods: object
}


