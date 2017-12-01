import {entityApi} from "../../global/entity-api";


export class AccountUserClient {
  api;
  constructor() {
    this.api = entityApi.accounts;
  }
}