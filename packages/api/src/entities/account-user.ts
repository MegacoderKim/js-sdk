import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IAccountUser } from "ht-models";
import { Page, IMembership,IPageData } from "ht-models";
import {HtRequest} from "../core/request";
import {empty} from "rxjs/observable/empty";
import { expand, map } from "rxjs/operators";

export class HtAccountUserApi extends HtBaseApi {
  name = "account user";
  base = "account_users";
  constructor(request: HtRequest) {
    super(request);
  }

  login(user: {
    username: string;
    password: string;
  }): Observable<IAccountUser> {
    let tail = `v1/login/`;
    return this.request.postObservable<IAccountUser>(
      this.request.baseUrl + tail,
      user
    );
  }

  get<IAccountUser>(id, token): Observable<IAccountUser> {
    let path = `v1/${this.base}/${id}/`;
    return this.api$(path, {}, { isAdmin: true });
  }

  memberships(id, query = {}, options?: object) {
    const path = `v1/${this.base}/${id}/memberships/`;
    return this.api$(path, query, options);
  }

  membershipsAll(id, query, token?: string) {
    const options = {isAdmin: true, token};
    return this.allPages(this.memberships(id, query, options), options)
  }
}
