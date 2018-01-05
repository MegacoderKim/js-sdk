export class HtClient {
  _token: string;
  _tempToken: string;
  _groupToken: string;
  pollDuration: number = 10000;

  constructor(token: string = "", options = {}) {
    this.token = token;
    this.pollDuration = options["pollDuration"] || this.pollDuration;
  }

  set token(token) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  set tempToken(token) {
    this._groupToken = "";
    this._tempToken = token;
  }

  get tempToken() {
    return this._tempToken;
  }

  set groupToken(token) {
    this._groupToken = token;
  }

  get groupToken() {
    return this._groupToken;
  }

  get currentToken() {
    return this.groupToken || this.tempToken || this.token;
  }
}

export const initClient = (token, config = {}) => {
  return htClientService.getInstance(token, config);
};

export const htClientFactory = (token, config) => {
  return new HtClient(token, config);
};

export const htClientService = (() => {
  var instance: HtClient;

  return {
    getInstance(token?, config = {}) {
      if (!instance) {
        instance = htClientFactory(token, (config = {}));
      }
      return instance;
    }
  };
})();
