import {Observable} from "rxjs/Observable";
import {IEntityClient} from "../base/entity-factory";

export interface AddGroupsListSelector {
  getRoots: () => Observable<any>
  getChildren: (groupId: string) => Observable<any>
}

export interface GroupsList extends IEntityClient, AddGroupsListSelector {
  dataArray$: any
}
