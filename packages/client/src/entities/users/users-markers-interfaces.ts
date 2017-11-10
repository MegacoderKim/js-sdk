import {IEntityClient} from "../base/entity-factory";

export interface AddUsersMarkersDispatchers {
  setDataMap: (mapFunc) => any
}

export interface IUsersMarkers extends IEntityClient, AddUsersMarkersDispatchers {
  dataArray$: any,
  getResults(cb: any): any,
  active$: any
}
