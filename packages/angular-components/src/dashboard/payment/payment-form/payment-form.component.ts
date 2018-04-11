import { Component, EventEmitter, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { config } from "../../config";
import { environment } from "../../../environments/environment";
import { AccountUsersService } from "../../account/account-users.service";
import { BroadcastService } from "../../core/broadcast.service";
import { SnackbarService } from "../../shared/snackbar/snackbar.service";
import { DOCUMENT } from "@angular/common";
import { CardInfo } from "../../model/billing";
import { ExternalAnalyticsService } from '../../core/external-analytics.service';
import { PartialAccount } from 'ht-models';
import { plansMap, billingPlans } from '../../settings/billing/billing_plans';
const img = require("../../../assets/image/payment_asserts.png");

const plans = [{
  "name": "Free forever",
  "icon": require('../../../assets/images/pricing/illustration-free.svg'),
  "cost": "0",
  "actionsCount": "2,500",
  "cta": "Current plan",
  "id": "free_forever:1"
}, {
  "name": "Starter",
  "icon": require('../../../assets/images/pricing/illustration-starter.svg'),
  "cost": "599",
  "actionsCount": "15,000",
  "cta": "Upgrade",
  "id": "starter:1"
}, {
  "name": "Regular",
  "icon": require('../../../assets/images/pricing/illustration-regular.svg'),
  "cost": "1,899",
  "actionsCount": "50,000",
  "cta": "Upgrade",
  "id": "regular:1"
}, {
  "name": "Enterprise",
  "icon": require('../../../assets/images/pricing/illustration-enterprise.svg'),
  "cost": "Custom",
  "actionsCount": "50,000",
  "cta": "Get in touch",
  "id": "enterprise:1"
}];

const faqs = [{
  "question": "What is an action?",
  "answer": "Actions are what you track with HyperTrack. You control what an action is. Actions typically correspond to the key actions that your users perform in your app, viz. visit, meetup, pickup, delivery, share location, and so on. Unless otherwise specified, a user’s calendar day is tracked as one action."
}, {
  "question": "What features are included?",
  "answer": "Each plan, free and paid, comes with unlimited consumption of data, visuals or events for actions that you create. There is no limit on the number of use cases, API gets, tracking views, consuming applications, webhooks received, Slack alerts or team members with dashboard access.",
}, {
  "question": "When does my card get charged?",
  "answer": "For any month, you get charged on the first of the following month. Partial months are pro-rated."
}, {
  "question": "When does an action get counted for billing purposes?",
  "answer": "The action gets counted as soon as they are created."
}, {
  "question": "What if I exceed the actions limit in a given month?",
  "answer": "You will not be able to create more actions once you hit the limit. Upgrade to the next tier if you wish to continue using without disruption."
}, {
  "question": "Can I switch between plans?",
  "answer": "Yes, you can switch between any of the paid plans at any time by visiting the billing details on your dashboard."
}, {
  "question": "Do you have a sandbox environment?",
  "answer": "Yes, every account gets a free sandbox environment with full functionality before going live in production. You can test with upto 2500 actions per month in your sandbox environment."
}];

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.less']
})
export class PaymentFormComponent implements OnInit {
  loading: boolean = false;
  img = img;
  cardInfo: CardInfo = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    // address_country: ''
  };
  savingCard: boolean = false;
  cleaveOptions = {
    creditCard: true,
    onCreditCardTypeChanged: (type) => {
      // this.zone.run(() => {
      //
      // })
      this.setCardType(type)
      // update UI ...
    }
  };
  monthOptions = {
    date: true,
    datePattern: ['m']
  };
  yearOptions = {
    date: true,
    datePattern: ['Y']
  };
  cardType: string;
  plans = plans;
  faqs = faqs;
  plansMap = plansMap;
  billingPlans = billingPlans;
  // countries = COUNTRIES;
  @Output() cardAdded: EventEmitter<boolean> = new EventEmitter();
  @Input() paymentType: string = '';
  @Input() isPopup: boolean = false;
  card;
  constructor(
    private zone: NgZone,
    private accountUserService: AccountUsersService,
    private broadcast: BroadcastService,
    private snackbarService: SnackbarService,
    private externalAnalyticsService: ExternalAnalyticsService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  selectPaymentMethod(paymentType) {
    if (paymentType == 'free_forever:1') {

    } else {
      this.externalAnalyticsService.logSegmentEvent( 'selected plan', 'interaction','payment', {
        selectedPlanName : paymentType
      });
      this.externalAnalyticsService.logSegmentIdentify( {
        selectedPlanName: paymentType
      });
      if ( paymentType === 'enterprise:1' ) {
        if ( window[ "analytics"] ) {
          window["Intercom"]('showNewMessage', 'I am interested in the Enterprise plan. Could you give me more details about it ?');
        }
      } else {
        this.paymentType = paymentType;
      }
    };
  }

  ngOnInit() {
    console.log(this.paymentType);
    if (!config.stripeLoaded) this.initStripe()
  }

  setCardType(type) {
    this.cardType = type
  }

  initStripe() {
    let document = this.document;
    var stripeScript = document.createElement('script');
    stripeScript.setAttribute('src', "https://js.stripe.com/v2/");
    stripeScript.onload = () => {
      let stripeKey = environment.stripeKey;
      Stripe.setPublishableKey(stripeKey);
      config.stripeLoaded = true;
    };
    document.head.appendChild(stripeScript);
  }

  submitCard(event): void {
    this.externalAnalyticsService.logSegmentEvent('submit card', 'interaction', 'payment');
    this.savingCard = true;
    // console.log(this.cardInfo);
    this.loading = true;
    Stripe.card.createToken(this.cardInfo, (status, response) => {
      this.zone.run(() => {
        this.stripeResponseHandler(status, response)
      });

    });
  }

  stripeResponseHandler(status, response): void {
    if (response.error) {
      this.snackbarService.displayErrorToast(response.error.message);
      this.savingCard = false;
      this.loading = false;
    } else {
      let token = response.id;

      this.accountUserService.addCard({ "token_id": token, billing_plan: this.paymentType }).subscribe(data => {
        this.savingCard = false;
        this.accountUserService.hydrateAccountUser();
        this.loading = false;
        if (this.paymentType) this.setBillingPlan(this.paymentType)
        this.broadcast.emit('card-added', true);
        this.cardAdded.next(true);
        // this.update({card: data})
      }, err => {
        // handle errors
        err = err.json();
        const msg = err ? err[0] : "Sorry, we were unable to add your card. Please contact us at help@hypertrack.com."
        this.snackbarService.displayErrorToast(msg);
        this.cardAdded.next(false);
        this.broadcast.emit('card-added', false);
        this.savingCard = false;
        this.loading = false;
      })
    }
  };

  private setBillingPlan(plan) {
    this.accountUserService.setBillingPlan(plan);
    // var obj = {billing_plan: plan} as PartialAccount;
    // this.accountUserService.updateAccount(obj, 'billing')
  }

}
