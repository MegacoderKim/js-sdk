import { Component, OnInit, AfterViewInit, ElementRef, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';
import {HtMapService} from "../../ht/ht-map.service";

@Component({
  selector: '[htAutoHeight]',
  templateUrl: './auto-height.component.html',
  styleUrls: ['./auto-height.component.scss']
})
export class AutoHeightComponent implements OnInit, AfterViewInit {
  @Output() onSet: EventEmitter<any> = new EventEmitter();
  @HostBinding('style.height.px')
  height:number;
  constructor(
    private elementRef: ElementRef,
    private mapService: HtMapService
  ) { };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setHeight()
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setHeight()
  };

  setHeight() {
    const windowHeight = window.innerHeight;
    const top = this.elementRef.nativeElement.getBoundingClientRect().top;
    const height = windowHeight - top;
    setTimeout(() => {
      this.height = height;
      this.onSet.next(this.height);
      this.mapService.inValidateSize();
    })
  }

  get _window() {
    if(window) {
      return window
    } else {
      return null;
    }
  }

}
