import { Component } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import {QueryLabel} from "ht-js-client";
import {Color} from "ht-js-utils";

@Component({
  selector: 'ht-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private htUsersClientService: HtUsersClientService) {
    const queryMap: QueryLabel[] = [
      {
        label: 'Logged in',
        values: ['stopped', 'on_trip', 'network_offline'],
        color: Color.blue
      },
      {
        label: 'Logged off',
        values: ['logged_off'],
        color: '#a8a8a8',
      },
      {
        label: 'Location disabled',
        values: ['location_disabled'],
        color: Color.red
      },
    ];
    this.htUsersClientService.statusQueryArray = queryMap
  }


}
