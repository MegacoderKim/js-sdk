// import {clientApi} from "./client-request";

export class HtClientConfigClass implements IConfig {
  pollTime = 10000;
  request;
  _token: string;
  // set token(token) {
  //   this.setToken(token)
  // }
  // setRequest(request) {
  //   request.token = request.token || this._token;
  //   // clientApi.request = request;
  // }
  // setToken(token) {
  //   this._token = token;
  //   // clientApi.request.setToken(token);
  // }
}

export const HtClientConfig = new HtClientConfigClass();
// export const HtClientConfig: IConfig = {
//   // currentToken: "",
//   // subToken: "",
//   pollTime: 10000,
//   api: entityApiFactory(),
//   // request: new HtRequest(),
//   setToken(token) {
//     this.token = token;
//   },
//   setRequest(_request) {
//     clientApi.request = _request;
//   }
// };

export interface IConfig {
  _token: string
  // currentToken: string,
  // subToken: string
  pollTime: number,
  request?: any,
  // setToken(token): void,
  // setRequest(req): void
}