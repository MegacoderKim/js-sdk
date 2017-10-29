import {HtRequest} from "./request";
import {entityApiFactory, IEntityApi} from "./entity-api";

export const clientApi: IApiConfig = {
  api: entityApiFactory(),
  request: new HtRequest(),
  token: "",
  setToken(token: string) {
    this.token = token;
    this.request.token = token;
    // this.api.request = this.request
  },
  setRequest(request) {
    request.token = request.token || this.token;
    this.request = request
  }
};

export interface IApiConfig {
  api: IEntityApi,
  request: HtRequest,
  token: string,
  subToken?: string
  setToken(token: string): void,
  setRequest(request): void
}