import {HtListClient} from "./list-client";

export abstract class HtAllItemsClient<T> extends HtListClient<T> {
  toUpdate = false;

}