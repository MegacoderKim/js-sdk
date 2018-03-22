import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {config} from "../../config";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {
  isMobile: boolean
  constructor(
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.isMobile = config.isMobile
  }

}
