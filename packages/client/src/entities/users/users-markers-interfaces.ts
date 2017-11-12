import {IEntityClient} from "../base/entity-factory";
import {Observable} from "rxjs/Observable";

export interface AddUsersMarkersDispatchers {
  setDataMap: (mapFunc) => any
}

export interface IUsersMarkers extends IEntityClient, AddUsersMarkersDispatchers {
  dataArray$: any,
  getResults(cb: any): any,
  getMarkers$(): Observable<any>
  active$: any
}
