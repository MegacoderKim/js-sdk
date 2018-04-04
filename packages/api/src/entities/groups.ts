import { HtBaseApi } from "./base";
import {IGroup, Page} from "ht-models";
import {Observable} from "rxjs/Observable";

export class HtGroupsApi extends HtBaseApi {
  name = "group";
  base = "groups";
  constructor(request) {
    super(request);
  }

  get<T>(id: string, query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/${id}/`;
    return this.api$<T>(path, query, {token});
  }

  index<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/`;
    return this.api$<T>(path, query, {token});
  }

  children(groupId: string, token?: string): Observable<Page<IGroup>> {
    const query = { parent_group_id: groupId };
    return this.getAll(query, token)
  }

  root(token?: string): Observable<Page<IGroup>> {
    const query = { has_parent: false };
    return this.getAll(query, token)
  }

  getAll(query, token?: string) {
    return this.allPages(this.index(query, token))
  }

  children(groupId: string, token?: string): Observable<Page<IGroup>> {
    const query = { parent_group_id: groupId };
    return this.getAll(query, token)
  }

  root(token?: string): Observable<Page<IGroup>> {
    const query = { has_parent: false };
    return this.getAll(query, token)
  }

  getAll(query, token?: string) {
    return this.allPages(this.index(query, token))
  }
}
