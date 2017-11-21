// import {Observable} from "rxjs/Observable";
// import {itemGetDataFactory$, listGetDataFactory} from "../helpers/get-data-factory";
// import {apiQueryF} from "../helpers/api-query-factory";
// import {entityItemConfigFactory, entityListConfigFactory} from "./entity-config";
// import {clientSubFactory} from "./client-factory";
// import {ListSelectorsFactory} from "../helpers/list-selector-factory";
// import {itemSelectorsFactory} from "../helpers/item-selectors-factory";

// export const entityClientFactory = (state, config, type: 'list' | 'item') => {
//   let {api$, selectors, dispatchers} = state;
//
//   let entitySelectors = type == 'list' ? ListSelectorsFactory(selectors) : itemSelectorsFactory(selectors);
//
//   config = type == 'list' ? entityListConfigFactory(config) : entityItemConfigFactory(config);
//
//   var e = {
//     firstDataEffect(data) {
//       dispatchers.setLoading(false)
//     },
//     ...config,
//     api$,
//     pollDuration: 10000,
//     ...selectors,
//     ...entitySelectors,
//     ...dispatchers,
//
//   };
//   e = apiQueryF(e, type);
//   if (type == 'item') e = itemGetDataFactory$(e);
//   if (type == 'list') e = listGetDataFactory(e);
//   e = clientSubFactory(e);
//   return e as IEntityClient
// };
//
// export interface IEntityClient extends IEntityClientBase{
//   apiQuery$(): Observable<any[]>,
//   getData$?(a, b): Observable<any>,
//   init(): IEntityClient,
// }
//
// export interface IEntityClientBase {
//   name: string,
//   pollDuration: number,
//   defaultQuery: object,
//   updateStrategy: string,
//   api$: (a, b?) => Observable<any>,
//   query$: Observable<any>,
//   active$?: Observable<boolean | undefined>,
//   data$: Observable<any>,
//   loading$: Observable<any>,
//   id$: Observable<any>,
//   setActive?: (isActive?: boolean) => void,
//   setData(data): void,
//   setLoading(data): void,
//   setId(data): void,
//   toggleId(data): void,
//   setQuery(data): void,
//   firstDataEffect(data): void
// }