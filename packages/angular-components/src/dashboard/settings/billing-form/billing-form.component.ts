import {Component, EventEmitter, Inject, Input, NgZone, OnInit, Output} from "@angular/core";
import {environment} from "../../../environments/environment";
import {AccountUsersService} from "../../account/account-users.service";
import {COUNTRIES} from "../../../utils/countries";
import {BroadcastService} from "../../core/broadcast.service";
import {DOCUMENT} from "@angular/common";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {config} from "../../config";
import {CardInfo} from "../../model/billing";

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.less']
})
export class BillingFormComponent implements OnInit {
  cardInfo: CardInfo = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    address_country: ''
  };
  savingCard: boolean = false;
  countries = COUNTRIES;
  @Output() cardAdded: EventEmitter<boolean> = new EventEmitter();
  @Input() isPopup: boolean = false;
  constructor(
    private zone: NgZone,
    private accountUserService: AccountUsersService,
    private broadcast: BroadcastService,
    private snackbarService: SnackbarService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    if(!config.stripeLoaded) this.initStripe()

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
    Stripe.card.createToken(this.cardInfo, (status, response) => {
      this.zone.run(() => {
        this.stripeResponseHandler(status, response)
      });

    });
  }

  stripeResponseHandler(status, response): void {
    console.log("call back");
    if (response.error) {
      this.snackbarService.displayErrorToast(response.error.message);
      this.savingCard = false;
    } else {
      let token = response.id;

      this.accountUserService.addCard({"token_id": token}).subscribe(data => {
        this.savingCard = false;
        this.cardAdded.next(true);
        this.broadcast.emit('card-added', true);
        this.accountUserService.hydrateAccountUser()
        // this.update({card: data})
      }, err => {
        // handle errors
        err = err.json();
        this.snackbarService.displayErrorToast("Sorry, we were unable to add your card. Please contact us at help@hypertrack.com.");
        console.log(err);
        this.cardAdded.next(false);
        this.broadcast.emit('card-added', false);
        this.savingCard = false;
      })
    }
  }

}
