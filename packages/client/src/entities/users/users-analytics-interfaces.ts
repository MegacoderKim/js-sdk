import {IEntityClient} from "../base/entity-factory";
import {Observable} from "rxjs/Observable";

export interface UsersAnalyticsDispatcher {
  setQueryReset(query): void,
  clearQueryKey(key: string): void
};

export interface UsersAnalytics extends IEntityClient, UsersAnalyticsDispatcher {
  dataArray$: any,
  getApiQuery$(): Observable<any>,
}
