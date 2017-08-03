export const HtClientConfig = {
  token: "",
  setToken(token) {
    this.token = token
  }
};

export interface IConfig {
  token: string
}