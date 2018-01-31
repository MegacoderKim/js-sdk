import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {animate, style, transition, trigger} from "@angular/animations";
import {HtUsersService} from "../ht/ht-users.service";

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
export class PlacelineContainerComponent implements OnInit, OnDestroy {
  @Input() userId: string | null;
  @Input() showUserCard: boolean = true;
  userData$;
  selectedSegmentId$;
  constructor(
    private userClientService: HtUsersService,
  ) { }

  ngOnInit() {
    this.selectedSegmentId$ = this.userClientService.placeline.segmentResetId$;

    this.userData$ = this.userClientService.placeline.data$;

    if (this.userId) {
      this.userClientService.placeline.setId(this.userId)
    }
  }

  onHighlightSegment(segmentId: string) {
    this.userClientService.placeline.setSegmentSelectedId(segmentId);
  }

  onSelectSegmentId(segmentId: string | null) {
    this.userClientService.placeline.setSegmentResetMapId(segmentId);
  }

  ngOnDestroy() {
    this.userClientService.placeline.setId(null);
    this.userClientService.placeline.clearData();
  }

}
