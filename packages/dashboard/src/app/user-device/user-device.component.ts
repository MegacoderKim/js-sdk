import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {UserService} from "../users/user.service";
import {map} from "rxjs/operators";
import {NameCase} from "ht-utility";

@Component({
  selector: 'app-user-device',
  templateUrl: './user-device.component.html',
  styleUrls: ['./user-device.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeviceComponent implements OnInit {
  @Input() userId: string;
  @Input() debug: boolean = false;
  data$;
  constructor(
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.data$ = this.usersService.device(this.userId).pipe(
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

export interface IUserDevice {
  user_id: string,
  recorded_at: string,
  time_zone: string,
  sdk_version: string,
  device_model: string,
  device_manufacturer: string,
  os_name: string,
  os_version: string,
  device_id: string,
  has_play_services: string,
  play_services_version: string,
  app_version: string,
  app_package_name: string
}
