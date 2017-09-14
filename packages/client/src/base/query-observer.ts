import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import {DataObserver} from "./data-observer";
import * as _ from "underscore";
// import {IQueryOptions} from "../interfaces";

export class QueryObserver extends DataObserver<object>{
  entityName: string = 'query';
  initialdata = {};

  // constructor(
  //   public options: IQueryOptions = {},
  // ) {
  //   super();
  //   this.setOptions(options);
  // }

  // data$(): Observable<object> {
  //   return this.allQuery$();
  // }

  // setInitialData(options) {
  //   let initialData = options.initialData || {};
  //   console.log(initialData, "initial data ready");
  //
  //   this.initialdata = {...this.initialdata, ...initialData};
  //   console.log(this.initialdata, "initial data");
  // }

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

  clearQueryKey(key: string) {
    this.data$().map(query => {
      let newQuery = {...query, [key]: null};
      delete newQuery[key];
      return newQuery
    }).take(1).subscribe((query) => this.updateData(query))
  }

  getDataBehaviour() {
    if(!this.dataBehavious$) {
      this.dataBehavious$ = new BehaviorSubject(this.initialData)
    }
    return this.dataBehavious$
  }

  // allQuery$() {
  //   // console.log(this.options);
  //   return this.dataSource$ ? this.dataSource$ : super.data$();
  // }
};