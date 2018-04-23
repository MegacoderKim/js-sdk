import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';

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
  constructor() {
    this.bo = `${this.height}px`;
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

}
