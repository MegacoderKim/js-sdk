import {HtListClient} from "./list-client";

export abstract class HtAllItemsClient<T> extends HtListClient<T> {
  toUpdate = false;
  allowedQueryKeys = ['search', 'status'];
  // allowedQueryKeys = [];

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 200, ordering: "-created_at"}
  }

  firstDataEffect(data) {
    if((data && !data.next) || !data) {
      // console.log("data", data);
      // this.storage.set(data);
      this.updateLoadingData(false)
    }
  }

}