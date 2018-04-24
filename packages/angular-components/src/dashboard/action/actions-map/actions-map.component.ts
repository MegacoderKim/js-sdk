import { Component, OnInit } from '@angular/core';
import {HtActionsService} from "ht-angular";
import {config} from "../../config";

@Component({
  selector: 'app-actions-map',
  templateUrl: './actions-map.component.html',
  styleUrls: ['./actions-map.component.scss']
})
export class ActionsMapComponent implements OnInit {
  loading$;
  query$;
  data$;
  baseUrl = config.isWidget ? '/widget' : '/';
  isMobile = config.isMobile;
  constructor(
    private actionsService: HtActionsService
  ) { }

  ngOnInit() {
    this.loading$ = this.actionsService.list.loading$;
    this.query$ = this.actionsService.list.getApiQuery$();
    this.data$ = this.actionsService.list.data$;
    this.actionsService.list.setActive();
    this.actionsService.listAll.setActive()
  }

}
