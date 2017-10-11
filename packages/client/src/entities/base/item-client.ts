import {Observable} from "rxjs/Observable";
import {ClientSubConfig, ClientSubDispatchers, HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {EntityConfigFactory} from "./entity-config";
import {
  EntityItem, EntityItemFactory, EntityItemSelectors, EntityItemState, EntityListState, EntityTypeConfig, GetData,
  ItemApi,
  ItemDispatchers, ItemSelectors, ReqSelectors
} from "./interfaces";
import {ItemSelectorsConfig, itemSelectorsFactory} from "../helpers/item-selectors-factory";
import {ItemApiQueryConfig} from "../helpers/api-query-factory";
import {GetDataConfig, itemGetDataFactory$} from "../helpers/get-data-factory";

export const HItemFactory: EntityItemFactory = (entityState: EntityItemState, overrideConfig: Partial<EntityTypeConfig>): EntityItem => {

  let {
    dispatchers,
    api$,
    store,
    firstDataEffect
  } = entityState;

  let itemApiQuery: ItemApiQueryConfig = {
    query$: entityState.selectors.query$,
    id$: entityState.selectors.id$
  };

  let itemSelectorsConfig: ItemSelectorsConfig = {
    selectors: entityState.selectors,
    itemApiQuery
  };

  let itemSelectors = itemSelectorsFactory(itemSelectorsConfig);

  let entity = EntityConfigFactory(overrideConfig);

  let itemGetDataConfig: GetDataConfig<ItemApi<any>> = {
    api$,
    pollDuration: entity.pollDuration,
    updateStrategy: entity.updateStrategy,
    firstDataEffect
  };

  let getData$ = itemGetDataFactory$(itemGetDataConfig);

  let clientSubConfig: ClientSubConfig = {
    apiQuery$: itemSelectors.apiQuery$,
    getData$,
    setLoading: dispatchers.setLoading,
    setData: dispatchers.setData
  };

  HClientFactory(clientSubConfig);

  return {
    api$,
    selectors: itemSelectors,
    ...entity
  }
};

