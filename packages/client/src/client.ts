import 'rxjs/add/observable/of';
import {htActionsApi} from "./api/actions";

export class HtClient {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  actions;

  constructor(private token: string) {
    this.initEntities(token)
  }

  initEntities(token) {
    this.actions =  htActionsApi(token);
  }

}
