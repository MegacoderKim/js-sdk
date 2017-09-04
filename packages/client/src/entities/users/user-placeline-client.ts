import {ItemClient} from "../../base/item-client";
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";

export class HtUserPlacelineClient extends ItemClient<IUserData> {

  api$(id, query): Observable<IUserData> {
    return this.api.placeline<IUserData>(id, {...this.defaultQuery, ...query})
  }
}