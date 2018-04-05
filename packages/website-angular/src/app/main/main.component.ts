import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ExternalAnalyticsService} from "../services/external-analytics.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  modalId = 'signupModal';
  constructor(
    private router: Router,
    private externalAnalyticsService: ExternalAnalyticsService
  ) { }

  ngOnInit() {
  }

}
