import {
  AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Output, EventEmitter,
  ViewChild, Optional, ContentChild, ViewContainerRef
} from '@angular/core';
import {IUserPlaceline} from "ht-models";
import {HtMapService} from "../ht/ht-map.service";
import {HtUsersService} from "../ht/ht-users.service";
import {MapInstance} from "ht-maps";
import {HtMap} from "ht-map-wrapper";

@Component({
  selector: 'ht-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() options: any;
  @Input() setBoundsOptions: any;
  @Input() mapInstance: MapInstance;
  @Input() loading: boolean = false;
  @Input() showReset: boolean = true;
  @Output() onReady: EventEmitter<HtMap | null> = new EventEmitter<HtMap>();
  @Output() onMapReset: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('map') mapElem;
  @ViewChild('resetCta', { read: ViewContainerRef }) resetCta;
  @ContentChild('reset') reset;
  constructor(
    private elRef: ElementRef,
    @Optional() htMapService: HtMapService
  ) {
    if(htMapService && !this.mapInstance) this.mapInstance = htMapService.mapInstance
  }

  @HostListener('resize', ['$event'])
  onMapResize(event) {
    this.mapInstance.inValidateSize()
    // todo this.mapService.map.resize();
  }

  ngOnInit() {
    // this.mapInstance = this.mapInstance;
    // const user$ = this.userService.placeline.getListener({id: "1f33d4cb-49e9-49b9-ad52-19f732ee55d8"});
    // // const user$ = this.userService.placeline.e("1f33d4cb-49e9-49b9-ad52-19f732ee55d8");
    // user$.subscribe((userData) => {
    //   // console.log("ise", userData);
    // });
    //
    // setTimeout(() => {
    //   this.userService.placeline.setId("75db8dcb-6fc3-44d7-8533-e40c7ebb0a1f")
    // }, 12000)

    // this.userService.placeline.initListener();
    // this.userService.placeline.data$.subscribe((userData: IUserData) => {
    //   // console.log(userData, "user Data map");
    //   if (userData) {
    //     this.mapService.tracePlaceline(userData);
    //     this.mapService.resetBounds()
    //   } else {
    //     this.mapService.segmentTrace.trace(null, this.mapService.map)
    //   }
    //
    // });
  }

  resetMap() {
    this.mapInstance.resetBounds(this.setBoundsOptions);
    this.onMapReset.next(true);
  }

  ngAfterViewInit() {
    const el = this.mapElem.nativeElement;
    this.mapInstance.renderMap(el, this.options);
    this.onReady.next(this.mapInstance.map);
    if (this.resetCta && this.reset) this.resetCta.createEmbeddedView(this.reset);
    // window['ht-map'] = this.mapService.map;
    // this.mapService.resetBounds()
  }

}
