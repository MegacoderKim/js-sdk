import {HtActionsGetClient} from "./actions-get-client";
import {HtActionsApi} from "../../api/actions";

export class HtActionsClient {
  item: HtActionsGetClient;
  api;
  constructor() {
    let api = new HtActionsApi();
    this.api = api;
  }

  updateListQuery() {

  }
}





