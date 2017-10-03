export const HtClientConfig = {
  token: "",
  subToken: "",
  pollTime: 10000,
  setToken(token) {
    this.token = token
  }
};

export interface IConfig {
  token: string,
  pollTime: number
}