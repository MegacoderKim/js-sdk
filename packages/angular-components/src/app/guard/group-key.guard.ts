import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {IGroup} from "ht-models";

@Injectable()
export class GroupKeyGuard implements CanActivate {
  constructor() {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = next.paramMap.get('id');
    console.log(next);

    // const key = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
    //   console.log("group", group);
    //   // next.data = {token: next.paramMap.get('id')};
    //   return group['token']
    // }).take(1);
    // return key.map((data) => {
    //   return true
    // });
    return true
  }
}
