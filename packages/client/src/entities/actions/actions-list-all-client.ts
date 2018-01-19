import {listQueryMixin} from "../../mixins/entity-query";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin} from "../../mixins/get-data";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {entityApi} from "../../global/entity-api";
import {Subscription} from "rxjs/Subscription";
import {AllowedQueryMap, IAllowedQueryMap} from "ht-data";
import {IAction, AllData} from "ht-models";

export class ActionsIndexAll extends EntityAllItemsClient {
  dataBehaviour$: BehaviorSubject<AllData<IAction> | null> = new BehaviorSubject(null);
  data$ = this.dataBehaviour$.asObservable();
  loadingBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingBehaviour$.asObservable();
  api$: (query) => Observable<IAction[]> = (query) => entityApi.actions.allPages(entityApi.actions.index(query));
  dataSub: Subscription;
  dataEntities$;
  addData(data) {
    this.dataBehaviour$.next(data)
  };

  setData(data) {
    this.dataBehaviour$.next(data)
  }

  setLoading(loading) {

  }
};

export const ActionsIndexAllClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsIndexAll)))
);