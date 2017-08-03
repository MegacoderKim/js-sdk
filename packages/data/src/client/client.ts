import 'rxjs/add/observable/of';
// import {htActionsApi} from "./api/actions";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
// import {HtClientConfig} from "../config";
import {HtClientConfig, htActionsApi} from "ht-js-client";
import {HtActionsClient} from "./actions-client";

export class HtClient {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  actions: HtActionsClient;

  constructor(request) {
    // this.token = this.token || HtClientConfig.token;
    this.initEntities(request)
  }

  initEntities(request) {
    this.actions =  new HtActionsClient(request);
  }

}