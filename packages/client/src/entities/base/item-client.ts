import {
  HEntityType, HEntityTypeClientOptions, HEntity, IDispatchers, ISelectors, HEntityState,
  HClientConfig, HEntityTypeFunctions, HEntityItemFunctions, HItem
} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {EntityConfigFactory} from "./entity-factory";
import {
  EntityItem, EntityItemFactory, EntityItemSelectors, EntityItemState, EntityListState, EntityTypeConfig,
  ItemDispatchers, ItemSelectors
} from "./arc";

export const HItemFactory: EntityItemFactory = (entityState: EntityItemState, overrideConfig: Partial<EntityTypeConfig>): EntityItem => {

  let {
    dispatchers,
    // selectors,
    api$,
    store
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
      // entity.firstDataEffect(data)
    });

    let update = first.expand((data) => {
      return Observable.timer(entity.pollDuration).switchMap(() => {
        return api$(id, query)

      })
    });

    return overrideConfig.updateStrategy != 'once' ? update : first
  };

  HClientFactory(dispatchers, selectors.apiQuery$, getData$);

  return {
    api$,
    dispatchers,
    selectors,
    ...entity
  }
};