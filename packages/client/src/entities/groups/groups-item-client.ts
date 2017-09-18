import {ItemClient} from "../../base/item-client";
import {HtGroupsApi} from "../../api/groups";
import {IGroup } from "ht-models"
import {Observable} from "rxjs/Observable";
export class HtGroupsItemClient extends ItemClient<IGroup, HtGroupsApi> {
  name = "group";

  getData$({id, query}): Observable<IGroup> {
    return id ?
      this.api$(id, query)
        .do(() => {
          this.loadingObserver.updateData(false)
        }) : Observable.of(null)

  }

  api$(id, query = {}): Observable<IGroup> {
    return this.api.get<IGroup>(id, {...this.defaultQuery, ...query})
  }
}