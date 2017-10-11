import {ClientSubConfig, HClientFactory} from "./client-factory";
import {Partial} from "ht-models";
import {EntityConfigFactory} from "./entity-config";
import {
  EntityList,
  EntityListFactory,
  EntityListSelectors,
  EntityListState,
  EntityTypeConfig, GenListSelectors,
  ListApi, ListSelectors
} from "./interfaces";
import {GetDataConfig, listGetDataFactory} from "../helpers/get-data-factory";
import {ListApiQueryConfig} from "../helpers/api-query-factory";
import {ListSelectorsFactory} from "../helpers/list-selector-factory";

export const HListFactory: EntityListFactory = (entityState: EntityListState, overrideConfig: Partial<EntityTypeConfig>): EntityList => {
  let {
    dispatchers,
    // selectors,
    api$,
    dateRangeParam,
    dateRangeQuery$,
    firstDataEffect,
    allowedQueryKeys
  } = entityState;

  let config = {
    updateStrategy: 'live',
    ...overrideConfig,
  };

  let entity = EntityConfigFactory(overrideConfig);

  let listApiQueryConfig: ListApiQueryConfig = {
    query$: entityState.selectors.query$,
    defaultQuery: entity.defaultQuery,
    allowedQueryKeys: allowedQueryKeys,
    dateRangeQuery$,
    active$: entityState.selectors.active$
  };

  let listSelector: GenListSelectors = ListSelectorsFactory({selectors: entityState.selectors, apiQueryConfig: listApiQueryConfig})

  let selectors: GenListSelectors = {
    ...listSelector
  };

  let getDataConfig: GetDataConfig<ListApi<any>> = {
    api$,
    pollDuration: entity.pollDuration,
    updateStrategy: entity.updateStrategy,
    firstDataEffect,
  };

  let getData$ = listGetDataFactory(getDataConfig);

  let clientSubConfig: ClientSubConfig = {
    apiQuery$: selectors.apiQuery$,
    getData$,
    setLoading: dispatchers.setLoading,
    setData: dispatchers.setData
  };

  HClientFactory(clientSubConfig);

  return {
    ...entity,
    selectors,
    api$
  }
};



