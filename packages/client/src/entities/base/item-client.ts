import {Observable} from "rxjs/Observable";
import {ClientSubConfig, ClientSubDispatchers, HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {EntityConfigFactory} from "./entity-config";
import {
  EntityItem, EntityItemFactory, EntityItemSelectors, EntityItemState, EntityListState, EntityTypeConfig, GetData,
  ItemApi,
  ItemDispatchers, ItemSelectors, ReqSelectors
} from "./interfaces";

export const HItemFactory: EntityItemFactory = (entityState: EntityItemState, overrideConfig: Partial<EntityTypeConfig>): EntityItem => {

  let {
    dispatchers,
    // selectors,
    api$,
    store,
    firstDataEffect
  } = entityState;


  let selectors: EntityItemSelectors = {
    ...entityState.selectors,
    apiQuery$: Observable.combineLatest(
      entityState.selectors.id$.distinctUntilChanged(),
      entityState.selectors.query$.distinctUntilChanged()
    )
  };

  let entity = EntityConfigFactory(overrideConfig);

  let getData$ = ([id, query]) => {
    let first = api$(id, query).do((data) => {
      if(firstDataEffect) {
        firstDataEffect(data)
      } else {
        dispatchers.setLoading(false)
      }
    });

    let update = first.expand((data) => {
      return Observable.timer(entity.pollDuration).switchMap(() => {
        return api$(id, query)

      })
    });

    return overrideConfig.updateStrategy != 'once' ? update : first
  };

  let clientSubConfig: ClientSubConfig = {
    apiQuery$: selectors.apiQuery$,
    getData$,
    setLoading: dispatchers.setLoading,
    setData: dispatchers.setData
  };

  HClientFactory(clientSubConfig);

  return {
    api$,
    dispatchers,
    selectors,
    ...entity
  }
};

// export const getItemApiQueryFactory$: (config: GetItemApiQueryConfig) => Observable<any[]> = (config: GetItemApiQueryConfig) => {
//   let {id$, query$} = config;
//   return Observable.combineLatest(
//     id$.distinctUntilChanged(),
//     query$.distinctUntilChanged()
//   )
// };
//
//
//
// export const itemClientSubs = (apiQueryConfig: GetItemApiQueryConfig, getDataConfig: GetItemDataConfig, clientSubDispatchers: ClientSubDispatchers): ReqSelectors => {
//   let apiQuery$ = getItemApiQueryFactory$(apiQueryConfig);
//   let getData$ = getItemDataFactory$(getDataConfig);
//   let clientSubConfig: ClientSubConfig = {
//     getData$,
//     apiQuery$,
//     ...clientSubDispatchers
//   };
//   HClientFactory(clientSubConfig);
//   return {apiQuery$}
// };
//
// export interface GetItemApiQueryConfig {
//   id$: Observable<string>,
//   query$: Observable<object>
// }

