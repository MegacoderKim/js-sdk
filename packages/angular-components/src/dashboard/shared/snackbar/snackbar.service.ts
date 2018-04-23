import { Injectable } from '@angular/core';
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";

@Injectable()
export class SnackbarService {
  public showErrorToast: Boolean = false;
  public showSuccessToast: Boolean = false;
  public successMessage: String;
  public loadingMessage: string;
  public errorMessage: String;
  public hideErrorToastTimer;
  public hideSuccessToastTimer;
  public showLoadingToast: boolean = false;

  constructor(
    public store: Store<fromRoot.State>,
  ) {

  }

  displayErrorToast(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.showErrorToast = true;
    this.hideSuccessToast();
    if(this.hideErrorToastTimer) clearTimeout(this.hideErrorToastTimer);
    this.hideErrorToastTimer = setTimeout(() => {
      this.hideErrorToast();
    }, 4000);
  }

  hideErrorToast(): void {
    this.showErrorToast = false
  }

  displaySuccessToast(successMessage: string): void {
    this.successMessage = successMessage;
    this.showSuccessToast = true;
    this.hideErrorToast();
    if(this.hideSuccessToastTimer) clearTimeout(this.hideSuccessToastTimer);
    this.hideSuccessToastTimer = setTimeout(() => {
      this.hideSuccessToast();
    }, 4000);
  }

  displayLoadingToast(string = ''): void {
    this.loadingMessage = string;
    setTimeout(() => {
      this.showLoadingToast = true;
    });

  }

  hideLoadingToast(): void {
    this.showLoadingToast = false;
  }

  hideLoadingToastMobile(): void {
    this.store.select(fromRoot.getUiShowMapMobile).pipe(take(1)).subscribe((show) => {
      if(show) this.hideLoadingToast()
    });
  }

  hideLoadingToastList(): void {
    this.store.select(fromRoot.getUiShowMapMobile).pipe(take(1)).subscribe((show) => {
      if(!show) this.hideLoadingToast()
    });
  }

  hideSuccessToast(): void {
    this.showSuccessToast = false
  }

}
