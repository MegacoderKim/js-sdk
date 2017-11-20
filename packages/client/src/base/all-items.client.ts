import {filter} from "rxjs/operators/filter";
import {map} from "rxjs/operators/map";
import * as _ from "underscore";
import {EntityListClient} from "./list-client";
import {Observable} from "rxjs/Observable";
import {AllData} from "../interfaces";

export class EntityAllItemsClient extends EntityListClient {
  updateStrategy = 'once';
  allowedQueryKeys = [ 'search', 'status'];
  data$: Observable<AllData<any>>;
  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  firstDataEffect(data) {
    if((data && !data.next) || !data) {
      this.setLoading(false)
    }
  }
  getDataArray$() {
    let dataArray$ = this.data$.pipe(
      filter((data: any) => !!data),
      map((data: AllData<any>) => {
        var resutls = _.values(data.resultsEntity);
        return resutls
      })
    );
    return dataArray$
  };
  getAllMarkers$(){
    const allMarkers$ = this.getDataArray$().pipe(
      map((markers) => {
        return _.reduce(markers, (acc, marker) => {
          const isValid = this.isValidMarker(marker);
          if (isValid) {
            acc.valid.push(marker)
          } else {
            acc.invalid.push(marker)
          };
          return acc
        }, {valid: [], invalid: []})
        // return markers
      })
    );

    return allMarkers$;

  };

  isValidMarker(marker) {
    return true;
  }
  getMarkers$() {
    return this.getAllMarkers$()
      .pluck('valid')

  };
  getResults(isFirstCb?) {
    return this.data$.map((allData: AllData<any>) => {
      if(allData && allData.isFirst && isFirstCb) isFirstCb();
      if(!allData) return allData;
      return _.values(allData.resultsEntity)
    })
  }
}