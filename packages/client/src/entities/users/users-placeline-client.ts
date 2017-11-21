import * as fromRoot from "../../reducers";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {store} from "../../global/store-provider";
import {Observable} from "rxjs/Observable";
import {ISegment, IUserData} from "ht-models";
import * as _ from "underscore";
import {EntityItemClient} from "../../base/item-client";
import {applyBaseMixins, applyMixins} from "../../helpers/mix";
import {ItemGetData} from "../../mixins/get-data";
import {ItemQuery} from "../../mixins/entity-query";
import {ClientSub} from "../../mixins/client-subscription";
import {combineLatest} from "rxjs/observable/combineLatest";
import {entityApi} from "../../global/entity-api";
import {dataWithSelectedId$} from "../../helpers/utils";

export class UsersPlacelineClient extends EntityItemClient {

  name = 'users placeline';
  updateStrategy = 'live';
  api$ = (id, query) => entityApi.users.placeline(id, query);

  constructor() {
    super();
    this.init()
  }

  query$ = store.select(fromRoot.getQueryPlacelineQuery);
  data$ = store.select(fromRoot.getUsersUsersData);
  loading$ = store.select(fromRoot.getLoadingUserData);
  id$ = store.select(fromRoot.getQueryPlacelineId);

  segmentsState$ = store.select(fromRoot.getSegmentsState);
  segmentSelectedId$ = store.select(fromRoot.getSegmentsSelectedId);

  setData(data) {
    store.dispatch(new fromUsersDispatcher.SetUserData(data))
  };
  setLoading(data) {
    store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
  };
  setId(id) {
    store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
  };
  toggleId(userId: string) {
    store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
  };
  setQuery(query) {
    store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
  }
  setSegmentSelectedId(segmentId) {
    store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
  };
  setSegmentResetMapId(segmentId: string) {
    store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
  }


  getMapData$() {
    return dataWithSelectedId$(this.data$, this.segmentSelectedId$, 'segments');
  }
}

applyMixins(UsersPlacelineClient, [ItemGetData, ItemQuery, ClientSub]);

// export const UsersPlacelineClientFactory = (): UsersPlaceline => {
//   let innerConfig: Partial<EntityTypeConfig> = {
//     name: 'users placeline',
//     updateStrategy: 'live',
//   };
//
//   let itemSelectors: EntityItemSelectors = {
//     query$: store.select(fromRoot.getQueryPlacelineQuery),
//     data$: store.select(fromRoot.getUsersUsersData),
//     loading$: store.select(fromRoot.getLoadingUserData),
//     id$: store.select(fromRoot.getQueryPlacelineId)
//   };
//
//   let placelineSelectors: AddUsersPlacelineSelector = {
//     segmentsState$: store.select(fromRoot.getSegmentsState),
//     getMapData$() {
//       return Observable.combineLatest(
//         this.data$,
//         this.segmentsState$,
//         (userData: IUserData, {selectedId, resetMapId}) => {
//           if(userData && (selectedId || resetMapId)) {
//             const id = selectedId || resetMapId;
//             let segments = _.filter(userData.segments, (segment: ISegment) => {
//               return segment.id === id;
//             });
//             userData = {...userData, segments: segments, events: [], actions: []}
//           }
//           return userData
//         }
//       )
//     }
//   };
//
//   let dispatchers: EntityItemDispatchers = {
//     setData(data) {
//       store.dispatch(new fromUsersDispatcher.SetUserData(data))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
//     },
//     setId(id) {
//       store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
//     },
//     toggleId(userId: string) {
//       store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
//     },
//     setQuery(query) {
//       store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
//     }
//   };
//
//   let placelineDispatchers: AddUsersPlacelineDispatchers = {
//     setSegmentSelectedId(segmentId) {
//       store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
//     },
//     setSegmentResetMapId(segmentId: string) {
//       store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
//     },
//   };
//
//
//   let api = clientApi.users;
//   let api$ = (id, query) => api.placeline(id, query);
//
//   let state = {
//     api$,
//     selectors: {
//       ...itemSelectors,
//       ...placelineSelectors
//     },
//     dispatchers: {
//       ...dispatchers,
//       ...placelineDispatchers
//     }
//   };
//
//   const placeline = entityClientFactory(state, innerConfig, 'item') as UsersPlaceline;
//
//   placeline.init();
//
//   return placeline
// };