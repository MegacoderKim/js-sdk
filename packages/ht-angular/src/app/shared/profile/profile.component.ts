import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
// const missingUrl = require("../../../images/missing.png");

@Component({
  selector: 'ht-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Input() url: string;
  @Input() height: number = 30;
  defaultUrl: string = "";
  constructor() {

  }

  ngOnInit() {
    // this.url = this.url || "images/missing.png"

  }

}
