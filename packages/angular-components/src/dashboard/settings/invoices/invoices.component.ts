import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AccountUsersService} from "../../account/account-users.service";
import {Observable} from "rxjs/Observable";
import {Page} from "ht-models";
import {IInvoices} from "../../../models/invoices";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {filter, map, switchMap, tap} from "rxjs/operators";
var download = require('../../../assets/download.js');

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent implements OnInit {
  invoices$: Observable<Page<IInvoices>>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private accountUsersService: AccountUsersService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.invoices$ = this.loading$.pipe(
      filter((data) => !!data),
      switchMap(() => this.accountUsersService.getInvoices({page_size: 50})),
      tap((data) => {
        this.loading$.next(false)
      })
    )
  }

  makePayment(invoice: IInvoices) {
    console.log(invoice);
    this.accountUsersService.makePayment(invoice.id).subscribe((data) => {
      console.log(data);
      this.loading$.next(true);
      this.snackbarService.displaySuccessToast("Payment made successfully")
    }, (err) => {
      console.log(err);
      this.snackbarService.displayErrorToast("Payment failed");
      this.loading$.next(true);
    })
  }

  download(invoice: IInvoices) {
    this.accountUsersService.downloadInvoice(invoice.id).pipe(
      map((res) => {
        // console.log(res, "res");
        return res
        // return res
      })
    )
      .subscribe((data) => {
        // console.log(data);
        // console.log(data.type, "data", data);
        // let b = new Blob([data['data']], {type: "application/pdf;charset=utf-8"});
        // FileSaver.saveAs(b, 'invice.pdf')
        download(data, 'invoice.html', "text/html")
      })
  }
}
