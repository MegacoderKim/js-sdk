// import {Observable} from "rxjs/Observable";
// import {IUser} from "ht-models"
// import {AllData, ApiType} from "../../interfaces";
// import * as fromRoot from "../../reducers";
// import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
// import {EntityListDispatchers, EntityTypeConfig, ListSelectors} from "../base/interfaces";
// import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
// import {AddUsersMarkersDispatchers, IUsersMarkers} from "./users-markers-interfaces";
// import {AllItemsHelpers} from "../helpers/all-items";
// import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
// import {store} from "../../store-provider";
// import {clientApi} from "../../client-api";
// import {entityClientFactory} from "../base/entity-factory";
//
// export const usersIndexMarkersFactory = ({dateRangeQuery$}): IUsersMarkers => {
//
//   let innerConfig: Partial<EntityTypeConfig> = {
//     name: 'users index all',
//     // defaultQuery: {page_size: 200},
//     // updateStrategy: 'once',
//     allowedQueryKeys: ['status']
//   };
//
//   innerConfig = AllItemsHelpers.getConfig(innerConfig);
//
//   let listDispatcher: EntityListDispatchers = {
//     setActive(isActive: boolean = true) {
//       store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
//     },
//     setData(data: AllData<IUser>) {
//       data = data || {resultsEntity: {}, isFirst: false};
//       store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndexAll(data))
//     },
//     setQuery(query) {
//       store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
//     }
//   };
//
//   let indexMarkersDispatchers: AddUsersMarkersDispatchers = {
//     setDataMap(mapFunc) {
//       store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
//     }
//   };
//
//   let listSelectors: ListSelectors = {
//     active$: store.select(fromRoot.getUsersIndexMarkersIsActive),
//     query$: store.select(fromRoot.getQueryUserQuery) as Observable<object>,
//     data$: store.select(fromRoot.getUsersIndexFilteredMarker),
//     loading$: store.select(fromRoot.getLoadingUserIndexAll)
//   };
//
//   let allSelectors = AllItemsHelpers.getSelectors(listSelectors);
//
//   let api$ = (query) => clientApi.users.all$(query, ApiType.index);
//
//   let state = {
//     api$,
//     selectors: {
//       ...listSelectors,
//       ...allSelectors,
//       dateRangeQuery$
//     },
//     dispatchers: {
//       ...indexMarkersDispatchers,
//       ...listDispatcher
//     }
//   };
//
//   const userIndexAll = entityClientFactory(state, innerConfig, 'list') as IUsersMarkers;
//
//   userIndexAll.init();
//
//   return userIndexAll;
//
//   // let markersState = {
//   //   ...state,
//   //     ...listSelectors,
//   //     ...listDispatcher,
//   //   firstDataEffect(data) {
//   //     if(!data.next) {
//   //       listDispatcher.setLoading(false)
//   //     }
//   //   },
//   //   allowedQueryKeys: [],
//   // };
//   //
//   // let entityList = HListFactory(markersState, innerConfig);
//   //
//   // return {
//   //   ...entityList,
//   //   ...listDispatcher,
//   //   ...indexMarkersDispatchers,
//   //   ...listSelectors,
//   //   ...entityList.selectors
//   // }
// };