import {IGroup} from "ht-models";
import {HtBaseApi} from "../../api/base";
import {HtListClient} from "../../base/list-client";
import {Page} from "ht-models";
import {Observable} from "rxjs/Observable";

export class HtGroupsListClient extends HtListClient<Page<IGroup>, HtBaseApi> {

  name = "group List"

  api$(query) {
    return this.api.index<Page<IGroup>>(query)
  }

  get loading$() {
    return Observable.empty()
  }

  get query$() {
    return Observable.of({})
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), ordering: "-created_at", page_size: 50}
  }

  get data$() {
    return Observable.empty()
  }
}