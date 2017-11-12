import {IEntityClient} from "../base/entity-factory";
import {Observable} from "rxjs/Observable";

export interface AddUsersPlacelineSelector {
  segmentsState$: Observable<any>,
  getMapData$(): Observable<any>
}

export interface AddUsersPlacelineDispatchers {
  setSegmentSelectedId: (segmentId) => any
  setSegmentResetMapId: (segmentId) => any
}

export interface UsersPlaceline extends IEntityClient, AddUsersPlacelineDispatchers, AddUsersPlacelineSelector {

};


