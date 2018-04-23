import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {IUserDevice} from "ht-models";
import {NameCase} from "ht-utility";
import {map} from "rxjs/operators";
import {HtUsersService} from "../ht/ht-users.service";

@Component({
  selector: 'ht-user-device',
  templateUrl: './user-device.component.html',
  styleUrls: ['./user-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeviceComponent implements OnInit {
  @Input() userId: string;
  @Input() debug: boolean = false;
  data$;
  constructor(
    private usersService: HtUsersService
  ) { }

  ngOnInit() {
    this.data$ = this.usersService.api.device(this.userId).pipe(
      map((data: IUserDevice) => {
        if(!this.debug) {
          return [
            [NameCase(data.device_manufacturer), data.device_model],
            ['SDK version:', data.sdk_version]
          ]
        } else {
          return Object.keys(data).map((key) => {
            return [key+': ', data[key]]
          })
        }
      })
    )
  }

}
