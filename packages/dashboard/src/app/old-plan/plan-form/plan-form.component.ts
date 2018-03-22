import {Component, EventEmitter, Inject, Input, NgZone, OnInit, Output} from '@angular/core';
const img = require("../../../assets/image/payment_asserts.png");
import {CardInfo} from "../../model/billing";
import {AccountUsersService} from '../../account/account-users.service';
import {BroadcastService} from '../../core/broadcast.service';
import {SnackbarService} from '../../shared/snackbar/snackbar.service';
import {DOCUMENT} from '@angular/common';
import {config} from '../../config';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.less']
})
export class PlanFormComponent implements OnInit {
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
  paymentType: 'paid_users' | 'paid_actions' = 'paid_actions';
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
  // countries = COUNTRIES;
  @Output() cardAdded: EventEmitter<boolean> = new EventEmitter();
  @Input() isPopup: boolean = false;
  card;
  constructor(
    private zone: NgZone,
    private accountUserService: AccountUsersService,
    private broadcast: BroadcastService,
    private snackbarService: SnackbarService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
    if(!config.stripeLoaded) this.initStripe()

  }

  setCardType(type) {
    this.cardType = type
  }

  initStripe() {
    let document = this.document;
    var stripeScript = document.createElement('script');
    stripeScript.setAttribute('src',"https://js.stripe.com/v2/");
    stripeScript.onload = () => {
      let stripeKey = environment.stripeKey;
      Stripe.setPublishableKey(stripeKey);
      config.stripeLoaded = true;
    };

    document.head.appendChild(stripeScript);

  }

  submitCard(event):void {
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
    console.log("call back");
    if (response.error) {
      console.log(response.error);
      this.snackbarService.displayErrorToast(response.error.message);
      this.savingCard = false;
      this.loading = false;
    } else {
      let token = response.id;

      this.accountUserService.addCard({"token_id": token, billing_plan: this.paymentType}).subscribe(data => {
        this.savingCard = false;
        this.accountUserService.hydrateAccountUser();
        this.loading = false;
        this.broadcast.emit('card-added', true);
        this.cardAdded.next(true);
        // this.update({card: data})
      }, err => {
        // handle errors
        err = err.json();
        const msg = err ? err[0] : "Sorry, we were unable to add your card. Please contact us at help@hypertrack.com."
        this.snackbarService.displayErrorToast(msg);
        console.log(err);
        this.cardAdded.next(false);
        this.broadcast.emit('card-added', false);
        this.savingCard = false;
        this.loading = false;
      })
    }
  }

}
