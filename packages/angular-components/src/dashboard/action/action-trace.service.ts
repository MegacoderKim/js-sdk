import { Injectable } from '@angular/core';
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {BroadcastService} from "../core/broadcast.service";
import {IActionHeat, IActionMap} from "ht-models";
import {ActionsHeatmapTrace} from "ht-maps";
import {Router} from "@angular/router";
import {config} from "../config";
import {HtMapService, HtUsersService, HtActionsService} from "ht-angular";
import {filter} from "rxjs/operators";
import * as _ from "underscore";

@Injectable()
export class ActionTraceService {
  constructor(
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private router: Router,
      private htMapService: HtMapService,
  ) {
    this.initListeners();
    this.setCluserClick();
  }

  private setCluserClick() {
    this.htMapService.actionsCluster.onClick = (data) => {
      this.selectAction(data.data)
    };
  };

  get map(): L.Map {
    return this.htMapService.map as L.Map;
  }

  private initListeners() {
    this.broadcast.on('hover-action').subscribe((actionId: string | null) => {
      this.htMapService.actionsCluster.setPopup(actionId)
    });

  }

  selectAction(action) {
    this.router.navigate(['/actions', {id: action.id}])
  }
}
