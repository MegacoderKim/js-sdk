import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {config} from "../config";
import {IUserPlaceline} from "ht-models";
import {PlacelineComponent} from "../placeline/placeline.component";
import {Observable} from "rxjs/Observable";
require('scrollspy')
// declare const ScrollSpy : any;
@Component({
  selector: 'app-placeline-mobile',
  templateUrl: './placeline-mobile.component.html',
  styleUrls: [
    '../placeline/placeline.component.less',
    './placeline-mobile.component.less',
  ]
})
export class PlacelineMobileComponent extends PlacelineComponent {
  @ViewChild('segmentContainer') segmentContainer;

  ngAfterViewInit() {
    // var s = new ScrollSpy('.segment-container', {
    //   callback: (e) => {
    //     console.log(e);
    //   }
    // })
    // Observable.fromEvent(this.segmentContainer.nativeElement, 'scroll').subscribe((e: any) => {
    //   console.log(e.srcElement.scrollLeft, "eve");
    // })
  }
}
