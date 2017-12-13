// import {Store} from "../../store/store";
// import * as fromRoot from "../../reducers"
// import {Observable} from "rxjs/Observable";
// import {AllData} from "../../interfaces";
// import {IUser, IUserAnalytics} from "ht-models";
// import {UsersList} from "./users-list";
// import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
// import {htUser} from "ht-data";
// import * as _ from "underscore";
// import {IUsersMarkers} from "./users-markers-interfaces"
// import { flatMap } from "rxjs/operators";
//
// export class UsersMarkers extends UsersList {
//
//   // constructor(
//   //   public store: Store<fromRoot.State>,
//   //   private usersIndexMarkers: IUsersMarkers,
//   //   private usersAnalyticsMarkers: IUsersMarkers
//   // ) {
//   //   super(store, usersIndexMarkers, usersAnalyticsMarkers)
//   // }; //todo fix later
//
//   setActive(isActive: boolean = true) {
//     this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
//   };
//
//   getResults(isFirstCb?) {
//     return this.data$.map((allData: AllData<IUser | IUserAnalytics>) => {
//       if(allData && allData.isFirst && isFirstCb) isFirstCb();
//       if(!allData) return allData;
//       return _.values(allData.resultsEntity)
//     })
//   }
//
//   setFilter(query) {
//     let statusString = query['status'];
//     let search = query['search'];
//     let ids = query['id'];
//     let userMarkerFilters: ((users) => any)[] = [];
//
//     if(statusString) {
//       let statusArray = statusString.split(',');
//       // this.updateUserMap(query);
//       let statusFilter: any[] = [];
//       statusArray.forEach((status) => {
//         statusFilter.push(htUser().getMarkerFilter(status))
//       });
//       let allStatusFilter = (user) => {
//         return _.reduce(statusFilter, (acc, filter: (user) => boolean) => {
//           return acc || filter(user)
//         }, false);
//       };
//
//       userMarkerFilters.push(allStatusFilter)
//     }
//     if(search) {
//       userMarkerFilters.push(((user: IUserAnalytics) => {
//         return htUser().getMarkerSearched(search)(user) // || userMarkerFilter(user)
//       }));
//       // this.updateUserMap(query);
//     }
//     if(ids) {
//       let userIds = ids.split(',');
//       userMarkerFilters.push((user: IUserAnalytics) => {
//         return _.contains(userIds, user.id)
//       })
//     }
//     let userMarkerFilter = (user) => {
//       return _.reduce(userMarkerFilters, (acc, filter: (user) => boolean) => {
//         return acc && filter(user)
//       }, true)
//     };
//
//     let dataMap = (allResults: AllData<any>) => {
//       let results = _.filter(allResults.resultsEntity, userMarkerFilter);
//       let resultsEntity = _.indexBy(results, 'id');
//       return {...allResults, resultsEntity}
//     };
//     this.setDataMap(dataMap)
//   }
//
//   setDataMap(mapFunc) {
//     this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
//   }
//
//   getUpdateQuery$(overview, query) {
//     return this.data$.let(
//       flatMap((allData: AllData<any>) => {
//         let results = _.values(allData.resultsEntity);
//         let currentTotalUsers = results.length;
//         let {totalUsers, chart} = overview;
//         let status = query['status'];
//         if(!!status) {
//           let value = _.find(chart, (datum) => {
//             return datum.keys.toString(',') == status;
//           });
//           return value && value !== currentTotalUsers ? Observable.of(true) : Observable.empty();
//         } else if(currentTotalUsers < totalUsers) {
//           return Observable.of(true)
//         }
//         return Observable.empty()
//       })
//     )
//   }
//
//   updateLatestData() {
//
//   }
//
// }
