// import {Observable} from "rxjs/Observable";
// import * as fromRoot from "../../reducers";
// import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
// import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
// import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
// import {UsersIndex} from "./users-index-interfaces";
// import {ListDispatchers, ListSelectors} from "../base/interfaces";
// import {store} from "../../store-provider";
// import {clientApi} from "../../client-api";
// import {entityClientFactory} from "../base/entity-factory";
//
// export const UsersIndexClientFactory = ({dateRangeQuery$}): UsersIndex => {
//   let innerConfig = {
//     name: 'users index',
//     defaultQuery: {ordering: '-last_heartbeat_at'},
//   };
//
//   let selectors: ListSelectors = {
//     query$: store.select(fromRoot.getQueryUserQuery) as Observable<object | null>,
//     data$: store.select(fromRoot.getUsersIndexPage),
//     active$: store.select(fromRoot.getUsersIndexIsActive),
//     loading$: store.select(fromRoot.getLoadingUserIndex)
//   };
//
//   let dispatchers: ListDispatchers = {
//     setData(data) {
//       store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(data))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndex(data))
//     },
//     setActive(isActive: boolean = true){
//       store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
//     },
//     setQuery(query = {}) {
//       store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
//     },
//     setQueryReset(query) {
//       store.dispatch(new fromQueryDispatcher.SetUserQueryResetPage(query))
//     },
//     clearQueryKey(key: string) {
//       store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
//     }
//   };
//
//   let api$ = (query) => clientApi.users.index(query);
//
//   let state = {
//     api$,
//     selectors: {
//       ...selectors,
//       dateRangeQuery$
//     },
//     dispatchers: {
//       ...dispatchers,
//     }
//   };
//
//   const usersIndex = entityClientFactory(state, innerConfig, 'list') as UsersIndex;
//
//   usersIndex.init();
//
//   return usersIndex;
//
//   // let listState = {
//   //   ...state,
//   //     ...selectors,
//   //     ...dispatchers,
//   //   firstDataEffect(data) {
//   //     dispatchers.setLoading(false)
//   //   }
//   // };
//   //
//   // let userIndex = {
//   //   ...dispatchers,
//   //   ...selectors,
//   // };
//   //
//   // let entityList = HListFactory(listState, innerConfig);
//   //
//   // return {
//   //   ...entityList,
//   //   ...dispatchers,
//   //   ...selectors,
//   //   ...entityList.selectors
//   // }
// };