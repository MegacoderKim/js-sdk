import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-action-zero-state',
  templateUrl: './action-zero-state.component.html',
  styleUrls: ['./action-zero-state.component.less']
})
export class ActionZeroStateComponent implements OnInit {

  platforms = {
    andorid: require('../../../../assets/image/platforms/android.png'),
    apple: require('../../../../assets/image/platforms/apple.svg'),
    java: require('../../../../assets/image/platforms/java.png'),
    python: require('../../../../assets/image/platforms/python.png'),
    react: require('../../../../assets/image/platforms/react-native.png'),
    'ruby': require('../../../../assets/image/platforms/ruby.png'),
    actiontypes: require('../../../../assets/image/actiontypes.png'),
  }
  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
  }

  openBilling() {
    $("#billing-modal").modal()
  }

  onCardAdded(isAdded) {
    if(isAdded) {
      $("#billing-modal").modal('hide');
      this.snackbarService.displaySuccessToast('Card was successfully added')
    } else {
      this.snackbarService.displayErrorToast('There was an error, card could not be added')
    }
  }
}
