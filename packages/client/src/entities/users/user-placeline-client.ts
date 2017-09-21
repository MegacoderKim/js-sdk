import {ItemClient} from "../../base/item-client";
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {htPlaceline} from "ht-js-data";
import {HtUsersApi} from "../../api/users";
import {HtClientConfig} from "../../config";
import {SegmentIdObserver} from "../../base/segment-id-observer";
import {IItemClientOptions} from "../../interfaces";
import * as fromRoot from "../../reducers";
import { Store} from "../../store/store";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";

export class HtUserPlacelineClient extends ItemClient<IUserData, HtUsersApi> {
  name = "placeline";

  segmentIdObserver: SegmentIdObserver;

  constructor(options?: IItemClientOptions<IUserData>) {
    super(options);
    this.segmentIdObserver = new SegmentIdObserver();
  }

  get id$() {
    return this.store.select(fromRoot.getQueryPlacelineId)
  }

  get data$() {
    return this.store.select(fromRoot.getUsersUsersData)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserData)
  }

  get query$() {
    return Observable.of({})
  }

  getUpdate$(data, {id, query}) {
    // console.log("up", id, query);
    return this.api$(id, query)
  }

  setSegmentSelectedId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
  }

  setSegmentResetMapId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
  }

  toggleId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
  }

  setId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.SetPlacelineId(userId))
  }


  api$(id, query = {}): Observable<IUserData> {
    return this.api.placeline<IUserData>(id, {...this.defaultQuery, ...query})
  }
}