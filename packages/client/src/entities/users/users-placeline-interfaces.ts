import {IEntityClient} from "../base/entity-factory";

export interface AddUsersPlacelineSelector {

}

export interface AddUsersPlacelineDispatchers {
  setSegmentSelectedId: (segmentId) => any
  setSegmentResetMapId: (segmentId) => any
}

export interface UsersPlaceline extends IEntityClient, AddUsersPlacelineDispatchers {

};


