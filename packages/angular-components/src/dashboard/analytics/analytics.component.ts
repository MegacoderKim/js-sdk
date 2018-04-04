import { Component, OnInit } from '@angular/core';
import { HtClientService } from "ht-angular";
import {config} from "../config";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {ContainerService} from "../container/container.service";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.less']
})
export class AnalyticsComponent implements OnInit {

  constructor(
    client: HtClientService,
    public snackbarService: SnackbarService,
    private containerService: ContainerService,
  ) {
    client.token = config.token;
  }

  ngOnInit() {
    this.containerService.setEntity(null);
    this.snackbarService.hideLoadingToast();
  }

}
