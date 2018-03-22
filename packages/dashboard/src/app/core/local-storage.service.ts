import { Injectable } from '@angular/core';
import {AsyncLocalStorage} from "angular-async-local-storage";
import {IAccountUser, IMembership} from "ht-models";

@Injectable()
export class StorageService {

  constructor(
      protected storage: AsyncLocalStorage
  ) { }

  setUser(accountUser: IAccountUser, cb?) {
    this.storage.setItem('accountUser', accountUser).subscribe(() => {
      if(cb) cb()
    })
  }

  setMemberships(memberships: IMembership[], cb?) {
    this.storage.setItem('memberships', memberships).subscribe(() => {
      if(cb) cb()
    })
  }

  getUser() {
    return this.storage.getItem('accountUser')
  }

  getMemberships() {
    return this.storage.getItem('memberships')
  }

  clearUser(cb?) {
    this.storage.removeItem('accountUser').switchMap(() => {
      return this.storage.removeItem('memberships')
    }).subscribe(() => {
      if(cb) cb()
    })
  }
}
