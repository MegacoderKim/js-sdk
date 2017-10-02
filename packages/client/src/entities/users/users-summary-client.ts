import {UsersList} from "./users-list";
import {HtUsersIndexClient} from "./users-index-client";
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {IUserListSummary} from "ht-models"

export class HtUsersSummaryClient extends HtUsersIndexClient {

  toUpdate = true;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersSummaryActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersSummary)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserSummary)
  }

  // getData$(query): Observable<IUserListSummary> {
  //   return this.api$(query).do(() => {
  //     this.updateLoadingData(false)
  //   }).expand(() => {
  //     return Observable.timer(this.pollDuration).switchMap(() => {
  //       return this.api$(query)
  //     })
  //   })
  //
  // }

  // getDefaultQuery() {
  //   return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  // }

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive))
  }

  setData(usersSummary) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary))
  }
}