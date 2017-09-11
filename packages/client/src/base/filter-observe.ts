import {QueryObserver} from "./query-observer";
import {DataObserver} from "./data-observer";

export class FilterObserve extends DataObserver<(any) => any>{
  initialData = (data) => data;
  entityName = 'filter';

}