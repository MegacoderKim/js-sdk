import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HtUsersService} from "../../ht/ht-users.service";
import {htPlaceline} from "ht-data";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users-placeline-container',
  templateUrl: './users-placeline-container.component.html',
  styleUrls: ['./users-placeline-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({transform: 'translateY(100px)'}),
        animate('0.3s' + ' ease-out')
      ]),
      transition(':leave', [
        animate('0.3s' + ' ease-in', style({transform: 'translateY(100px)'}))
      ])
    ])
  ]
})
export class UsersPlacelineContainerComponent implements OnInit, OnDestroy {
  @Input() userId: string | null;
  @Input() showUserCard: boolean = true;
  userData$;
  selectedSegmentId$;
  loading$
  constructor(
    private userClientService: HtUsersService,
  ) { }

  ngOnInit() {
    this.selectedSegmentId$ = this.userClientService.placeline.segmentResetId$;
    this.loading$ = this.userClientService.placeline.loading$;
    this.userData$ = this.userClientService.placeline.data$;

    if (this.userId) {
      this.userClientService.placeline.setId(this.userId)
    }
  };

  getPlacelineLive(userPlaceline): boolean {
    return htPlaceline().isLive(userPlaceline)
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
