import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";

@Component({
  selector: 'ht-placeline-map-container',
  templateUrl: './placeline-map-container.component.html',
  styleUrls: ['./placeline-map-container.component.less']
})
export class PlacelineMapContainerComponent implements OnInit {

  @Input() userId: string | null;
  @Input() showSidebar: boolean = true;
  userData$;
  constructor(
    private userClientService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.userClientService.placeline.setId(this.userId);
    // this.userData$ = this.userClientService.getUserData().do((userData: IUserData) => {
    //   if (userData) {
    //     this.mapService.tracePlaceline(userData);
    //     this.mapService.resetBounds()
    //   } else {
    //     this.mapService.segmentTrace.trace(null, this.mapService.map)
    //   }
    // });

    // if (this.userId) {
    //   this.userClientService.placeline.setId(this.userId)
    // }
  }

}
