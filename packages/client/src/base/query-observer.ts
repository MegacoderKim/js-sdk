import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import {DataObserver} from "./data-observer";
import * as _ from "underscore";
import {IQueryOptions} from "../interfaces";

export class QueryObserver extends DataObserver<object>{
  entityName: string = 'query';
  initialdata = {};
  constructor(
    public options: IQueryOptions = {},
  ) {
    super();
    this.setOptions(options);
  }

  data$(): Observable<object> {
    return this.allQuery$();
  }

  setInitialData(options) {
    let initialData = options.initialData || {};
    this.initialdata = {...this.initialdata, ...initialData};
  }

  getAllowedParams$(query, params: string[]) {
    let params$ =_.map(params, (param: string) => {
      return query.pluck(param).distinctUntilChanged().map((query) => {
        return {[param]: query}
      })
    });
    return Observable.combineLatest(
      ...params$
    ).map((queries: object[]) => {
      return _.reduce(queries, (acc, query) => {
        return {...acc, ...query}
      }, {})
    })
  }

  allQuery$() {
    // console.log(this.options);
    return this.dataSource$ ? this.dataSource$ : super.data$();
  }
};