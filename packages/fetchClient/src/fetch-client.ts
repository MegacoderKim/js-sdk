import {HtClient} from "ht-js-client";
import {HtActionsFetchApi} from "./entities/actions";

export class HtFetchClient extends HtClient {

  initEntities(token) {
    this.actions =  new HtActionsFetchApi(token);
  }

}