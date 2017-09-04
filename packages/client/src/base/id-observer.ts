import {DataObserver} from "./data-observer";

export class IdObserver extends DataObserver<string | number> {
  entityName = "id"
}