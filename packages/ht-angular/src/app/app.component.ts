import { Component } from '@angular/core';
import {QueryLabel, clientApi} from "ht-client";
import {Color, GetUrlParam} from "ht-utility";
import {HtUsersService} from "./ht/ht-users.service";
import {HtConfigService} from "./ht/ht-config.service";

@Component({
  selector: 'ht-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private htUsersClientService: HtUsersService,
    // private config: ClientApiService
  ) {
    const token = GetUrlParam('key');
    if (token) clientApi.setToken(token);
    // console.log(clientApi);
    // console.log(this.config.actions, "log");
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
    // this.htUsersClientService.statusQueryArray = queryMap
  }


}
