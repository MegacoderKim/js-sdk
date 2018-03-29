import {Component, OnInit} from "@angular/core";
import {IAccount, Invoice} from "ht-models";
import {AccountUsersService} from "../../account/account-users.service";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import * as moment from "moment-mini"
// import  from "frappe-charts"
// import Chart from "../../../../node_modules/frappe-charts/dist/frappe-charts.min.esm.js"
// import Chart from "frappe-charts"
const Chart = require("../../../../../../node_modules/frappe-charts/dist/frappe-charts.min.cjs.js");

// import * as Chart from "../../../../node_modules/frappe-charts/dist/frappe-charts.min.esm.js"
// import * as Chart from "frappe-charts"
// import "../../../../node_modules/frappe-charts/dist/frappe-charts.min.iife.js"
// declare const Chart: any;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.less']
})
export class BillingComponent implements OnInit {
  public invoices: Array<Invoice>;
  public showBillingForm: boolean = false;
  public loadingInvoices: boolean = true;
  hasInvoices: boolean = false;

  cardAddedInfo: boolean = false;
  account$;
  billingData;
  total;
  free;
  paid;
  constructor(
      private accountUserService: AccountUsersService,
      private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.account$ = this.accountUserService.getAccount();
    this.getBillingSummary()
  }

  displayBillingForm(event) {
    this.checkOwner(() => {
      this.showBillingForm = true
    })
  }


  update(obj) {
    this.account$.take(1).subscribe((account: IAccount) => {
      this.accountUserService.updateAccountWithoutPatch({...account, ...obj})
    })
  }

  updateWithPatch(obj, type) {
    this.accountUserService.updateAccount(obj, type);
  }

  hideBillingForm() {
    this.showBillingForm = false
  }
  checkOwner(callback) {
    //todo check if its owner
    callback()
  }

  onCardAdded(isAdded: boolean) {
    if(isAdded) {
      this.showBillingForm = false;
      this.snackbarService.displaySuccessToast("Card added successfully");
    } else {
      this.snackbarService.displayErrorToast("There was an error adding the card to your account. Please try again.");
    }


  }

  addBillingContact(value) {
    let email = value;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email), email);
    if(re.test(email)) {
      this.updateWithPatch({billing_email: email}, 'billing_email');
    } else {
      this.snackbarService.displayErrorToast('Please enter valid email');
    }
  }

  // get writeRole() {
  //   return this.accountUserService.getAccount()
  // }

  getNumberLocaleString(num: number) {
    return num.toLocaleString('en-US');
  }

  private getBillingSummary() {
    this.accountUserService.billingSummary().subscribe(billing => {
      this.billingData = billing;
      let total = 0;
      let paid = 0;

      for (let i = 0, _len = billing.length; i < _len; i++ ) {
        total += billing[i].count;
        paid += billing[i].is_paid_count;
      }

      this.total = total;
      this.paid = paid;
      this.free = total - paid;
      // console.log(Chart);
      var t = this.modBillingData(billing);
      const chart = new Chart({
        parent: '#chart', // or a DOM element
        data: t,
        type: 'bar', // or 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        is_series: 1,
        x_axis_mode: 'tick',
      });
      if(t.datasets.length > 1) chart.show_sums();
    })
  }

  private modBillingData(billingData: IBillingDatum[]) {
    let format = billingData.length < 15 ? 'MMM DD' : "DD";
    let labels = billingData.map((datum: IBillingDatum) => {
      return moment(datum.date).format(format);
      // return new Date(datum.date).toLocaleDateString();
    });
    let paidTotal = 0;
    let unpaidTotal = 0;
    let paidSet = billingData.reduce((acc, datum: IBillingDatum) => {
      paidTotal = paidTotal + datum.is_paid_count;
      acc.values.push(datum.is_paid_count);
      return acc;
    }, {title: "Billable", values: [], color: 'red'});
    let unpaidSet = billingData.reduce((acc, datum: IBillingDatum) => {
      let unbillable = datum.count - datum.is_paid_count;
      unpaidTotal = unpaidTotal + unbillable;
      acc.values.push(unbillable);
      return acc;
    }, {title: "Unbillable", values: [], color: 'blue'});
    let datasets = [];
    // console.log(unpaidTotal, paidTotal);
    if(unpaidTotal == 0 && paidTotal) {
      datasets = [paidSet]
    } else if(paidTotal == 0 && unpaidTotal) {
      datasets = [unpaidSet]
    } else {
      datasets = [paidSet, unpaidSet]
    }
    return {
      labels,
      datasets
    }
  }
}
export interface IBillingDatum {
  date: string,
  count: number,
  is_paid_count: number,
}


