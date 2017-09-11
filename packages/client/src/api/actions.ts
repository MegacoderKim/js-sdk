import {HtBaseApi} from "./base";

export class HtActionsApi extends HtBaseApi{
  name = "Action"
  constructor(request) {
    super('actions', request)
  }
}

export const htActionsApi = (request) => new HtActionsApi(request);