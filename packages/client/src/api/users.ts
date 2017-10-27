import {HtBaseApi} from "./base";
import {Observable} from "rxjs/Observable";
import {IUserAnalyticsPage} from "ht-models";


export class HtUsersApi extends HtBaseApi{
  name = "user";

  constructor() {
    super('users')
  }

  analytics(query): Observable<IUserAnalyticsPage> {
    let tail = `/analytics/`;
    return this.getReqFromTail<IUserAnalyticsPage>(tail, query)
  }
}