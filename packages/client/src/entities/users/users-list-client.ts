import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";

export class HtUsersListClient extends HtListClient {

  setApi(request) {
    this.api = new HtUsersApi(request)
  }

}