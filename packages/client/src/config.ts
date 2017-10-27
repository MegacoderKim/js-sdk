import {apiFactory} from "./client-api";
import {apiConfig} from "./client-request";
// import {HtRequest} from "./request";
export class HtClientConfigClass implements IConfig {
  pollTime = 10000;
  api: any = apiFactory();
  request;
  _token: string;
  set token(token) {
    this.setToken(token)
  }
  setRequest(request) {
    request.token = request.token || this._token;
    apiConfig.request = request;
  }
  setToken(token) {
    this._token = token;
    apiConfig.request.setToken(token);
  }
}

export const HtClientConfig = new HtClientConfigClass();
// export const HtClientConfig: IConfig = {
//   // currentToken: "",
//   // subToken: "",
//   pollTime: 10000,
//   api: apiFactory(),
//   // request: new HtRequest(),
//   setToken(token) {
//     this.token = token;
//   },
//   setRequest(_request) {
//     apiConfig.request = _request;
//   }
// };

export interface IConfig {
  _token: string
  // currentToken: string,
  // subToken: string
  pollTime: number,
  api?: any,
  request?: any,
  setToken(token): void,
  setRequest(req): void
}