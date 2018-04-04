import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers";
import * as fromQuery from "../actions/query";

@Injectable()
export class ContainerGuardGuard implements CanActivate {

  constructor(
    private route: ActivatedRoute,
    public store: Store<fromRoot.State>,
  ) {}

  fillStore(queryParam) {
    let showAll = queryParam['show_all'];
    if(showAll || showAll == 'true') {
      this.store.dispatch(new fromQuery.UpdateUserListQueryQueryAction({show_all: true}))
    }
    if(queryParam.start || queryParam.end) {
      let def = {start: queryParam.start, end: queryParam.end};
      this.store.dispatch(new fromQuery.UpdateDateRangeQueryAction(def))
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.fillStore(next.queryParams);
    return true;
  }
}
