import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {EntityConfigFactory} from "./entity-config";
import {
  EntityItem, EntityItemFactory, EntityItemSelectors, EntityItemState, EntityListState, EntityTypeConfig,
  ItemDispatchers, ItemSelectors
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

  HClientFactory(dispatchers, selectors.apiQuery$, getData$);

  return {
    api$,
    dispatchers,
    selectors,
    ...entity
  }
};