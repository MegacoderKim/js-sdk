import * as fromRoot from "../../reducers";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {AddUsersPlacelineDispatchers, AddUsersPlacelineSelector, UsersPlaceline,} from "./users-placeline-interfaces";
import {EntityItemDispatchers, EntityItemSelectors, EntityTypeConfig} from "../base/interfaces";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {entityClientFactory} from "../base/entity-factory";
import {Observable} from "rxjs/Observable";
import {IUserData, ISegment} from "ht-models";
import * as _ from "underscore";

export const UsersPlacelineClientFactory = (): UsersPlaceline => {
  let innerConfig: Partial<EntityTypeConfig> = {
    name: 'users placeline',
    updateStrategy: 'live',
  };

  let itemSelectors: EntityItemSelectors = {
    query$: store.select(fromRoot.getQueryPlacelineQuery),
    data$: store.select(fromRoot.getUsersUsersData),
    loading$: store.select(fromRoot.getLoadingUserData),
    id$: store.select(fromRoot.getQueryPlacelineId)
  };

  let placelineSelectors: AddUsersPlacelineSelector = {
    segmentsState$: store.select(fromRoot.getSegmentsState),
    getMapData$() {
      return Observable.combineLatest(
        this.data$,
        this.segmentsState$,
        (userData: IUserData, {selectedId, resetMapId}) => {
          if(userData && (selectedId || resetMapId)) {
            const id = selectedId || resetMapId;
            let segments = _.filter(userData.segments, (segment: ISegment) => {
              return segment.id === id;
            });
            userData = {...userData, segments: segments, events: [], actions: []}
          }
          return userData
        }
      )
    }
  };

  let dispatchers: EntityItemDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUserData(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
    },
    setId(id) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
    },
    toggleId(userId: string) {
      store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
    },
    setQuery(query) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
    }
  };

  let placelineDispatchers: AddUsersPlacelineDispatchers = {
    setSegmentSelectedId(segmentId) {
      store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
    },
    setSegmentResetMapId(segmentId: string) {
      store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
    },
  };

  let api = clientApi.users;
  let api$ = (id, query) => api.placeline(id, query);

  let state = {
    api$,
    selectors: {
      ...itemSelectors,
      ...placelineSelectors
    },
    dispatchers: {
      ...dispatchers,
      ...placelineDispatchers
    }
  };

  const placeline = entityClientFactory(state, innerConfig, 'item') as UsersPlaceline;

  placeline.init();

  return placeline
};