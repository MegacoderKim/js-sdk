import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {IGroup, Page} from "ht-models";
import {Injectable} from "@angular/core";
import {HtGroupsService} from "../ht/ht-groups.service";
import {map, switchMap, take} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class GroupKeyResolver implements Resolve<any> {

  constructor(private groupService: HtGroupsService) {}


  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const id = next.paramMap.get('id');
    const groupKey$ = this.groupService.api.get(id).pipe(
      map((data: IGroup) => {
        return data ? data.token : "test";
      })
    );

    // return groupKey$.take(1)
    return of(true).pipe(
      switchMap(() => {
        return groupKey$.pipe(take(1))
      })
    )
    // const key$ = this.clientService.groups.item.getListener({id}).map((group: IGroup) => {
    //   // next.data = {token: next.paramMap.get('id')};
    //   console.log(group.token, "group");
    //   return group.token
    // });
    // return key$
  }
}
