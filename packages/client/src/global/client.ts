import {HtApi, HtRequest} from "ht-api";

export class HtClient {
  api: HtApi;
  constructor(request: HtRequest, token: string = "") {
    this.api = new HtApi(request, token);
    this.token = token;
  }

  set token(token) {
    this.api.request.tokenServie.token = token;
  }

  set tempToken(token) {
    this.api.request.tokenServie.tempToken = token;
  }
}

export const initClient = (request: HtRequest, token?: string) => {
  return htClientService.setInstance(request, token);
};

export const htClientFactory = (request: HtRequest, token?: string) => {
  return new HtClient(request, token);
};

export const htClientService = (() => {
  var instance: HtClient;

  return {
    setInstance(request: HtRequest, token = "") {
      if (instance) {
        console.error("Client already initialized")
      };
      instance = htClientFactory(request, token);
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
