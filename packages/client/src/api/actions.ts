import { HtBaseApi } from "./base";
import {IUserAnalyticsPage} from "../../../models";
import {Observable} from "rxjs/Observable";
import {IActionStatusGraph} from "ht-models";
import {map} from "rxjs/operators";

export class HtActionsApi extends HtBaseApi {
  name = "Action";
  constructor() {
    super("actions");
  }

  graph(query): Observable<IActionStatusGraph[]> {
    let path = `${this.base}/graph/`;
    return this.api$(path, query).pipe(
      map(obj => {
        return Object.keys(obj).reduce((dataArray: IActionStatusGraph[], key: string) => {
          dataArray.push(obj[key]);
          return dataArray
        }, []).sort((a, b) => {
          return new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
        })
      })
    );
  }
}

export const htActionsApi = () => new HtActionsApi();
