import {IGroup} from "ht-models";
import {HtBaseApi} from "../../api/base";
import {HtListClient} from "../../base/list-client";
import {Page} from "ht-models";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {Store} from "../../store/store";
import {AllData} from "../../interfaces";

export class HtGroupsListClient extends HtListClient<Page<IGroup>> {

  name = "group List";

  // api$(query) {
  //   return this.api.index<Page<IGroup>>(query)
  // }

  getDataQuery$() {
    let dataQuery$ = this.query$.map((query) => {
      return {...this.getDefaultQuery(), ...query}
    });
    return dataQuery$
  }

  get isActive$() {
    return this.store.select(fromRoot.getGroupListActive)
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
    return this.store.select(fromRoot.getGroupAll)
  }

  get dataArray$() {
    return this.data$.map((dataPage) => {
      return dataPage ? dataPage['results'] : null
    })
  }

  setData(data) {
    return this.store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
  }

  setActive(isActive?) {
    return this.store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
  }


}