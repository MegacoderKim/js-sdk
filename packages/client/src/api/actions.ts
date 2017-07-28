import {HtBaseApi} from "./base";

export class HtActionsApi extends HtBaseApi{
  constructor(token: string) {
    super('actions', token)
  }
}

export const htActionsApi = (token) => new HtActionsApi(token);