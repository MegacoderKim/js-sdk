export class HtClient {
  _token: string;
  _tempToken: string;
  pollDuration: number = 10000;

  constructor(token: string = "", {pollDuration}) {
    this.token = token;
    this.pollDuration = pollDuration || this.pollDuration;
  }

  set token(token) {
    this._token = token
  }

  get token() {
    return this._token;
  }

  set tempToken(token) {
    this._tempToken = token;
  }

  get tempToken() {
    return this._tempToken;
  }

  get currentToken() {
    return this.tempToken || this.token;
  }
}

export const htClientFactory = (token, config) => {
  return new HtClient(token, config)
};

export const htClientService = (() => {
  var instance: HtClient;

  return {
    getInstance(token?, config = {}) {
      if ( !instance ) {
        instance = htClientFactory(token, config = {});
      }
      return instance;
    }
  }
})();