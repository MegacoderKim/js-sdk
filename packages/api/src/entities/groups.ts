import { HtBaseApi } from "./base";
import {IGroup, Page} from "ht-models";
import {Observable} from "rxjs/Observable";

export class HtGroupsApi extends HtBaseApi {
  name = "group";

  constructor(request) {
    super(request, "groups");
  }

  children(groupId: string): Observable<Page<IGroup>> {
    const query = { parent_group_id: groupId };
    return this.getAll(query)
  }

  root(): Observable<Page<IGroup>> {
    const query = { has_parent: false };
    return this.getAll(query)
  }

  getAll(query) {
    return this.allPages(this.index(query))
  }
}
