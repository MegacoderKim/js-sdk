import {HtClientConfig} from "../config";
var store = require("store");

export class UsersListStorage {
  key = "";

  constructor() {
    this.cleanOld()
  }

  cleanOld() {
    let keys = [];
    store.each((value, key) => {
      if(key.contains(this.sfx)) {
        new Date(value.time).toDateString() !== new Date().toDateString() && keys.push(key)
      }
    });
    keys.forEach(value => {
      store.remove(value)
    })
  }

  set(data) {
    this.state = data;
  }

  get(key) {
    return this.state[key];
  }

  set state(data) {
    let state = {data, time: new Date().toISOString()};
    store.set(this.token, state)
  }

  get state() {
    return store.get(this.token) ? store.get(this.token).data : {}
  }

  get token() {
    return HtClientConfig.subToken + "_uls"
  }

  get sfx() {
    return  "_uls"
  }

}

// export const userListStorage = new Storage();