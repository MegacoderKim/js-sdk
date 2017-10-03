import {HtListClient} from "./list-client";

export abstract class HtAllItemsClient<T> extends HtListClient<T> {
  toUpdate = false;
  allowedQueryKeys = ['search', 'status'];
  // allowedQueryKeys = [];

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 400, ordering: "-created_at"}
  }

}