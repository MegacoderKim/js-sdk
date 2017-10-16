import {Observable} from "rxjs/Observable";

export class HtActionsGetClient{
  name = 'actions get';

  // api$(id, query) {
  //   return this.api.get<IAction>(id, {...this.defaultQuery, ...query})
  // }

  get id$() {
    return Observable.empty()
  }

  get loading$() {
    return this.id$
  }

  get query$() {
    return Observable.of({})
  }

  setData(data) {

  }

}