import {HtActionsApi} from "ht-js-client";
import {HtFetchRequest} from "../fetch-request";

export class HtActionsFetchApi extends HtActionsApi{

  setRequest(token) {
    this.request = new HtFetchRequest(token)
  }

}