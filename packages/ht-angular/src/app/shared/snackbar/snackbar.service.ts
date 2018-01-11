import { Injectable } from '@angular/core';

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

  ) {

  }

  displayErrorToast(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.showErrorToast = true;
    this.hideSuccessToast();
    if (this.hideErrorToastTimer) clearTimeout(this.hideErrorToastTimer);
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
    if (this.hideSuccessToastTimer) clearTimeout(this.hideSuccessToastTimer);
    this.hideSuccessToastTimer = setTimeout(() => {
      this.hideSuccessToast();
    }, 4000);
  }

  displayLoadingToast(string = ''): void {
    this.loadingMessage = string;
    this.showLoadingToast = true;
  }

  hideLoadingToast(): void {
    this.showLoadingToast = false;
  }

  hideSuccessToast(): void {
    this.showSuccessToast = false
  }

}
