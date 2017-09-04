import {QueryObserver} from "./query-observer";
import {DataObserver} from "./data-observer";

export class LoadingObserver extends DataObserver<Boolean>{
  initialData = true;
  entityName = 'loading'
}