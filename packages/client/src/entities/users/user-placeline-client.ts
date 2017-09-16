import {ItemClient} from "../../base/item-client";
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {htPlaceline} from "ht-js-data";
import {HtUsersApi} from "../../api/users";
import {HtClientConfig} from "../../config";
import {SegmentIdObserver} from "../../base/segment-id-observer";

export class HtUserPlacelineClient extends ItemClient<IUserData, HtUsersApi> {
  entityName = "placeliine";
  segmentIdObserver: SegmentIdObserver;
  constructor(options?) {
    super(options);
    this.segmentIdObserver = new SegmentIdObserver();
  }

  getUpdate$(data, {id, query}) {
    // console.log("up", id, query);
    return this.api$(id, query)
  }

  api$(id, query = {}): Observable<IUserData> {
    return this.api.placeline<IUserData>(id, {...this.defaultQuery, ...query})
  }
}