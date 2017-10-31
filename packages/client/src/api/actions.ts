import {HtBaseApi} from "./base";

export class HtActionsApi extends HtBaseApi{
  name = "Action";
  constructor() {
    super('actions')
  }
}

export const htActionsApi = () => new HtActionsApi();