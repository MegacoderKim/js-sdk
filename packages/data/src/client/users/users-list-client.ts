import {HtListClient} from "../base/list-client";
import {HtUsersApi} from "ht-js-client";

export class HtUsersListClient extends HtListClient {

  setApi(request) {
    this.api = new HtUsersApi(request)
  }

}