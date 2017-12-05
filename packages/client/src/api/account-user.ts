import {HtBaseApi} from "./base";
import {Observable} from "rxjs/Observable";
import {IAccountUser} from "ht-models";
import {getAuthHeaders} from "ht-data";
import {scan} from "rxjs/operators";
import {Page, IMembership} from "ht-models";


export class HtAccountUserApi extends HtBaseApi{
  name = "user";

  constructor() {
    super('account_users')
  }

  login(user: {username: string, password: string}): Observable<IAccountUser> {
    let tail = `login/`;
    return this.request.postObservable<IAccountUser>(this.request.baseUrl + tail, user)
  }

  get<IAccountUser>(id, token): Observable<IAccountUser> {
    let path = `${this.base}/${id}/`;
    let headers = getAuthHeaders(this.request.adminToken);
    return this.api$(path, {}, {headers})
  }

  memberships(id, query = {}, options?) {
    const path = `${this.base}/${id}/memberships/`;
    return this.api$(path, query, options)
  }

  membershipsAll(id, query, options) {
    let headers = getAuthHeaders(this.request.adminToken);
    options = {headers, ...options};
    return this.allPages(this.memberships(id, query, options), options).pipe(
      scan((acc: null | Page<IMembership>, membershipsPage: Page<IMembership>) => {
        return acc ? {...membershipsPage, results: [...acc.results, ...membershipsPage.results]} : membershipsPage
      }, null)
    )
  }

}