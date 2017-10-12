import {Component, Input, OnInit} from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-placeline-container',
  templateUrl: './placeline-container.component.html',
  styleUrls: ['./placeline-container.component.less'],
  // animations: [
  //   trigger('slide', [
  //     transition(':enter', [
  //       style({transform: 'translateY(100px)'}),
  //       animate('0.3s' + ' ease-out')
  //     ]),
  //     transition(':leave', [
  //       animate('0.3s' + ' ease-in', style({transform: 'translateY(100px)'}))
  //     ])
  //   ])
  // ]
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
