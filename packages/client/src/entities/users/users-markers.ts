import {HtUsersAnalytics} from "./users-analytics";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models"

export class HtUsersMarkers extends HtUsersAnalytics {
  entityName = "analytics users";
  onFirstUpdate;
  onUpdate;
  getDefaultQuery() {
    return {ordering: "-created_at", ...super.getDefaultQuery()}
  }

  api$(query) {
    return this.api.all$((data, isFirst) => {
      if (this.onUpdate) this.onUpdate(data);
      if(this.onFirstUpdate && isFirst) this.onFirstUpdate(data)
    })
  }
}