import { Component, OnInit } from '@angular/core';
import {HtUsersService} from "../../ht/ht-users.service";
import {bottomAppear} from "../../common/animations";

@Component({
  selector: 'ht-actions-placeline-container',
  templateUrl: './actions-placeline-container.component.html',
  styleUrls: ['./actions-placeline-container.component.scss'],
  animations: [
    bottomAppear
  ]
})
export class ActionsPlacelineContainerComponent implements OnInit {
  data$;
  loading$;
  selectedSegmentId$;
  constructor(
    private usersService: HtUsersService
  ) { }

  ngOnInit() {
    this.data$ = this.usersService.placeline.data$;
    this.loading$ = this.usersService.placeline.loading$;

    this.selectedSegmentId$ = this.usersService.placeline.segmentResetId$;

  };

  onHighlightSegment(segmentId: string) {
    this.usersService.placeline.setSegmentSelectedId(segmentId);
  }

  onSelectSegmentId(segmentId: string | null) {
    this.usersService.placeline.setSegmentResetMapId(segmentId);
  }

}
