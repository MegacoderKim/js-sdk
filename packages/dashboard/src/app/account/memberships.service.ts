import { Injectable } from '@angular/core';
import {PageService} from "../core/page.service";
import {config} from "../config";
import {StorageService} from "../core/local-storage.service";
import {IMembership} from "ht-models";
import {Store} from "@ngrx/store";
import * as fromRooot from "../reducers";
import * as fromAccountUsers from "../actions/account-user";
import {Observable} from "rxjs/Observable";
import {GetMemberFromMemberships} from "../../utils/account-user-helper";

@Injectable()
export class MembershipsService {

  constructor(
    private page: PageService,
    private storage: StorageService,
    private store: Store<fromRooot.State>,
  ) {
    // this.getMembershipsState().subscribe((memberships) => {
    //   this.storage.setMemberships(memberships)
    // })
  }

  all(cb?) {
    const userId = config.userId;
    const adminToken = config.adminToken;
    let headers = {'Authorization': `token ${adminToken}`};
    return this.page.all(`app/account_users/${userId}/memberships/?page_size=100`, (data) => {
      if(cb) cb(data)
    }, {headers})
  }

  setMemberships(memberships: IMembership[]) {
    this.storage.setMemberships(memberships);
    this.setState(memberships)
  }

  setState(memberships: IMembership[]) {
    this.store.dispatch(new fromAccountUsers.UpdateMembershipsAction(memberships))
  }

  getMembershipsState() {
    return this.store.select(fromRooot.getAccountMemberships).filter(data => !!data)
  }

  getCurrentMember(): Observable<IMembership> {
    return this.getMembershipsState().map((memberships) => {
      let member = GetMemberFromMemberships(memberships, config.token, config.tokenType);
      return member
    })
  }

}
