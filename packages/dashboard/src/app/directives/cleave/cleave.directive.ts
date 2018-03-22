import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
var Cleave = require('cleave.js');

@Directive({
  selector: '[appCleave]'
})
export class CleaveDirective implements AfterViewInit, OnDestroy {
  cleave;
  @Input() appCleave: object = {};
  constructor(private  ref: ElementRef) {
    // console.log(this.ref);
  }

  ngAfterViewInit() {
    this.cleave = new Cleave(this.ref.nativeElement, this.appCleave);
    // this.ref.nativeElement.value = this.cleave.getFormattedValue()
  }

  ngOnDestroy() {
    this.cleave.destroy()
  }

}
