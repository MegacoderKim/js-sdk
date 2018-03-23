import { Injectable } from '@angular/core';
import * as fromRoot from "../reducers";
import * as fromQuery from "../actions/query";
import * as fromUi from "../actions/ui";
import {Store} from "@ngrx/store";

@Injectable()
export class ContainerService {

  constructor(
      private store: Store<fromRoot.State>
  ) { }

    setView(view: string) {
      this.store.dispatch(new fromQuery.ChangeViewQueryAction(view))
    }

    setEntity(entity: 'users' | 'actions' | null) {
      this.store.dispatch(new fromQuery.ChangeEntityQueryAction(entity))
    }

    setDetailView(showDetail) {
      this.store.dispatch(new fromUi.UpdateShowFilterUiAction(!showDetail))
    }
}
