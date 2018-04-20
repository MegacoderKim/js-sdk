import {
  AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Output, EventEmitter,
  ViewChild, Optional, ContentChild, ViewContainerRef, ChangeDetectionStrategy
} from '@angular/core';
import {IUserPlaceline} from "ht-models";
import {HtMapService} from "../ht/ht-map.service";
import {HtUsersService} from "../ht/ht-users.service";
import {MapInstance} from "ht-maps";
import {HtMap} from "ht-map-wrapper";

@Component({
  selector: 'ht-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  ngOnInit() {

  }

  resetMap() {
    this.mapInstance.resetBounds(this.setBoundsOptions);
    this.onMapReset.next(true);
  }

  ngAfterViewInit() {
    const el = this.mapElem.nativeElement;
    setTimeout(() => {
      this.mapInstance.renderMap(el, this.options);
      this.onReady.next(this.mapInstance.map);
    }, 10);
    if (this.resetCta && this.reset) this.resetCta.createEmbeddedView(this.reset);
    // window['ht-map'] = this.mapService.map;
    // this.mapService.resetBounds()
  };

  ngOnDestroy() {
    this.mapInstance.map$.next(null)
  }

}
