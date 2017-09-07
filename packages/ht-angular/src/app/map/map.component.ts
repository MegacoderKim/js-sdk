import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";

@Component({
  selector: 'ht-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() options: any = {};
  constructor(
    private elRef: ElementRef,
    private mapService: HtMapService,
    private userService: HtUsersClientService,
  ) { }

  ngOnInit() {

    // const user$ = this.userService.placeline.getListener({id: "1f33d4cb-49e9-49b9-ad52-19f732ee55d8"});
    // // const user$ = this.userService.placeline.e("1f33d4cb-49e9-49b9-ad52-19f732ee55d8");
    // user$.subscribe((userData) => {
    //   // console.log("ise", userData);
    // });
    //
    // setTimeout(() => {
    //   this.userService.placeline.setId("75db8dcb-6fc3-44d7-8533-e40c7ebb0a1f")
    // }, 12000)

    this.userService.placeline.initListener();
    this.userService.placeline.data$.subscribe((userData: IUserData) => {
      // console.log(userData, "user Data map");
      if (userData) {
        this.mapService.tracePlaceline(userData);
        this.mapService.resetBounds()
      } else {

      }

    });
  }

  ngAfterViewInit() {
    const el = this.elRef.nativeElement;
    this.mapService.initMap(el, this.options);
    this.mapService.resetBounds()
  }

}
