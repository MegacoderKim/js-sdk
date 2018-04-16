import {HtApi, HtRequest} from "ht-api";

export class HtClient {
  api: HtApi;
  constructor({request, token}: HtClientOptions = {}) {
    request = request || new HtRequest(token);
    this.api = new HtApi(request, token);
    this.token = token;
  }

  set token(token) {
    this.api.request.tokenServie.token = token;
  }

  set tempToken(token) {
    this.api.request.tokenServie.tempToken = token;
  }
};

export interface HtClientOptions {
  request?: HtRequest,
  token?: string
}

export const initClient = (options: HtClientOptions = {}) => {
  return htClientService.setInstance(options);
};

export const htClientFactory = (options: HtClientOptions = {}) => {
  return new HtClient(options);
};

export const htClientService = (() => {
  var instance: HtClient;

  return {
    setInstance(options: HtClientOptions = {}) {
      if (instance) {
        console.error("Client already initialized")
      };
      instance = htClientFactory(options);
      return instance;
    },
    getInstance() {
      if (!instance) {
        console.error("Client not initialized, call initClient(request: HtRequest, token?: string)")
      }
      return instance;
    }
  };
})();
