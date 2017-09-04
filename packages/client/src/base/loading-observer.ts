import {QueryObserver} from "./query-observer";
import {DataObserver} from "./data-observer";

export class LoadingObserver extends DataObserver<Boolean>{
  initialData = true;
  entityName = 'loading';

  setDataSource(options) {
    //do not change loading source as it requires to be updated from inside
  }
}