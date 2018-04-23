import {Directive, ElementRef} from '@angular/core';
import {BroadcastService} from "../core/broadcast.service";
import {debounceTime} from "rxjs/operators";

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {
  body;
  constructor(private el: ElementRef, private broadcast: BroadcastService) {
    this.body = el.nativeElement;
    this.broadcast.on('scroll-top').pipe(debounceTime(200)).subscribe(() => {
      if(this.body.parentElement) this.body.parentElement.scrollIntoView()
    })
  }



}
