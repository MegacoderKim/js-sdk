import { Injectable } from '@angular/core';
const Cookies = require("js-cookie");

@Injectable()
export class StorageService {
  tokenString = 'ht-prod-token';
  tempTokenString = 'ht-prod-temp-token';
  envString = 'ht-prod-env';
  userIdString = 'user-id';
  constructor() { }

  set(key, value, options = {}) {
    Cookies.set(key, value);
  }

  get(key) {
    return Cookies.get(key)
  };

  remove(key) {
    Cookies.remove(key)
  }

  removeAll() {
    this.remove(this.tokenString);
    this.remove(this.tempTokenString);
    this.remove(this.envString);
    this.remove(this.userIdString)
  }

  getToken() {
    return this.get(this.tokenString)
  };

  getTempToken() {
    return this.get(this.tempTokenString)
  }

  getUserId() {
    return this.get(this.userIdString)
  }

  setUserId(value) {
    this.set(this.userIdString, value)
  }

  setToken(token, env?) {
    this.set(this.tokenString, token);
    this.setEnv(env)
  }

  setTempToken(token, env?) {
    this.set(this.tempTokenString, token);
    this.setEnv(env)
  };

  setEnv(env) {
    if (env) {
      this.set(this.envString, env)
    }
  };

  getEnv() {
    return this.get(this.envString)
  }


}
