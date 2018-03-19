import * as fromRoot from "../../reducers";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import { Observable } from "rxjs/Observable";
import { EntityItemClient } from "../../base/item-client";
import { getIdQueryDataMixin } from "../../mixins/get-data";
import { itemQueryMixin } from "../../mixins/entity-query";
import { clientSubMixin } from "../../mixins/client-subscription";
import { IClientConfig } from "../../interfaces";
import { Subscription } from "rxjs/Subscription";
import { IUserPlaceline } from "ht-models";
import { getFirstDataMixin } from "../../mixins/get-first-data";

export class UsersPlaceline extends EntityItemClient {
  name = "users placeline";
  updateStrategy = "live";
  api$: (id, query) => Observable<IUserPlaceline>;
  store;
  data$;
  loading$;
  segmentsState$;
  segmentSelectedId$;
  segmentResetId$;

  constructor({ store, api }: IClientConfig) {
    super();
    this.api$ = (id, query) => api.placeline(id, query);
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersPlacelineQuery);
    this.data$ = this.store.select(fromRoot.getUsersUsersData);
    this.loading$ = this.store.select(fromRoot.getUsersPlacelineLoading);
    this.id$ = this.store.select(fromRoot.getUsersPlacelineId);
    this.segmentsState$ = this.store.select(fromRoot.getSegmentsState);
    this.segmentSelectedId$ = this.store.select(fromRoot.getSegmentsSelectedId);
    this.segmentResetId$ = this.store.select(fromRoot.getSegmentsResetMapId);
    // this.init()
  }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUserData(data));
  }
  setLoading(data) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineLoading(data));
  }
  setId(id) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineId(id));
  }
  toggleId(userId: string) {
    this.store.dispatch(new fromUsersDispatcher.TogglePlacelineId(userId));
  }
  setQuery(query) {
    this.store.dispatch(new fromUsersDispatcher.SetPlacelineQuery(query));
  }
  setSegmentSelectedId(segmentId) {
    this.store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId));
  }
  setSegmentResetMapId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId));
  }

  getMapData$() {
    // return dataWithSelectedId$(this.data$, this.segmentSelectedId$, [
    //   "segments"
    // ]);
  }

  clearData() {
    this.setData(null);
    this.setQuery({});
  }
}

export const UsersPlacelineClient = clientSubMixin(
  getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(UsersPlaceline)))
);

