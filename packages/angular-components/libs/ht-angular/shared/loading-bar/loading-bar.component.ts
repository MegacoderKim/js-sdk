import { Component, OnInit, HostBinding, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ht-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.less']
})
export class LoadingBarComponent implements OnInit, AfterViewInit {
  @HostBinding('style.bottom')
  bo: string;
  // setBottom() {
  //   return this.sanitize.bypassSecurityTrustStyle(`{bottom: ${this.height}px}`)
  // }
  height: number = 2;
  constructor(private sanitize: DomSanitizer, private elem: ElementRef) {
    this.bo = `${this.height}px`;
  }

  ngAfterViewInit() {
    console.log(this.elem.nativeElement.bottom);
  }

  ngOnInit() {
  }

}
