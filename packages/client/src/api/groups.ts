import {HtBaseApi} from "./base";

export class HtGroupsApi extends HtBaseApi {
  name = "group";

  constructor(request) {
    super('groups', request)
  }
}