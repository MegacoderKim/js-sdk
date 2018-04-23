import { Component, EventEmitter, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { CardInfo } from "../model/billing";
import { AccountUsersService } from "../account/account-users.service";
import { BroadcastService } from "../core/broadcast.service";
import { SnackbarService } from "../shared/snackbar/snackbar.service";
import { DOCUMENT } from "@angular/platform-browser";
import { config } from "../config";
import { environment } from "../../environments/environment";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ExternalAnalyticsService } from '../core/external-analytics.service';
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {
  isCardAdded: boolean = false;
  addAddress: boolean = false;
  paymentType;
  currentpaymentType;
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private externalAnalyticsService: ExternalAnalyticsService,
    private accountUserService: AccountUsersService
  ) { }

  ngOnInit() {
    this.externalAnalyticsService.logSegmentEvent('visited payment', 'interaction', 'payment');
    this.paymentType = this.route.snapshot.params['type'];
    this.accountUserService.getAccount().pipe(filter(data => !!data),take(1))
      .subscribe((account) => {
        this.currentpaymentType = account['billing_plan'];
      });
  }

  close() {
    this.location.back()
  }

}
