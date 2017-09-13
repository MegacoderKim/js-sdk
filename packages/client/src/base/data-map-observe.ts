import {QueryObserver} from "./query-observer";
import {DataObserver} from "./data-observer";

export class DataMapObserve extends DataObserver<(any) => any>{
  initialData = (data) => data;
  entityName = 'dataMap';

}