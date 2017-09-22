import {Component, Input, OnInit} from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";

@Component({
  selector: 'ht-placeline-container',
  templateUrl: './placeline-container.component.html',
  styleUrls: ['./placeline-container.component.less']
})
export class PlacelineContainerComponent implements OnInit {
  @Input() userId: string | null;
  @Input() showUserCard: boolean = true;
  userData$;
  constructor(
    private userClientService: HtUsersClientService,
  ) { }

  ngOnInit() {
      // this.userClientService.placeline.initListener();
      this.userData$ = this.userClientService.placeline.data$;

    if (this.userId) {
      this.userClientService.placeline.setId(this.userId)
    }
  }

  onSegmentId(segmentId: string) {
    // console.log(segmentId, "segmentId");
    this.userClientService.placeline.setSegmentSelectedId(segmentId);
  }

  onSelectSegmentId(segmentId: string) {

  }

}
