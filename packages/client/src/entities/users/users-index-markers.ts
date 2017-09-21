import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUser } from "ht-models"
import {HtUsersIndexClient} from "./users-index-client";
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";

export class HtUsersIndexMarkers extends HtUsersIndexClient {
  entityName = "analytics users";

  get IsActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexMarkersIsActive)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserIndexAll)
  }

  get data$(): Observable<AllData<IUser>> {
    return this.store.select(fromRoot.getUsersIndexAll)
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  api$(query) {
    return this.api.all$(query, ApiType.index)
  }
}